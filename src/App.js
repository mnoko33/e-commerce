import Header from './components/Header.js';
import CategoryList from './components/CategoryList.js';
import ProductList from './components/ProductList.js';
import ProductInfo from './components/ProductInfo.js';
import Sidebar from './components/Sidebar.js';
import Footer from './components/Footer.js';
import Loading from './components/Loading.js';
import api from './api.js';

class App {
  initialState = {
    products: [],
    productInfo: null,
    isLoadingVisible: false,
  }
  constructor($app) {
    this.$app = $app;
    this.state = this.initialState

    this.header = new Header($app);

    this.categoryList = new CategoryList({ 
      $app, 
      updateProducts: async (categoryName) => {
        this
          .showLoading()
          .updateProducts({ products: await api.getProducts(categoryName) })
          .hideLoading()
      }
    });

    this.productList = new ProductList({
      $app,
      initialData: this.state.data,
      handleProductClick: async id => {
        this
          .showLoading()
          .setState({ productInfo: await api.getProductById(id) })
          .updateProductInfo()
          .updateSidebar()
          .hideLoading()
      }
    })

    this.productInfo = new ProductInfo({ 
      $app, 
      productInfo: this.state.productInfo, 
    });

    this.sidebar = new Sidebar({ 
      $app,
      handleProductClick: async id => {
        this
          .showLoading()
          .setState({ productInfo: await api.getProductById(id) })
          .updateProductInfo()
          .hideLoading()
      },
      MAX_QUEUE_SIZE: 3,
    });

    this.footer = new Footer($app);

    this.loading = new Loading({
      $app,
      visible: false,
    });

    this.init();
  }

  async init () {
    this
      .showLoading()
      .updateProducts({ products: await api.getProducts('전체보기') })
      .hideLoading()
  }

  setState(payload) {
    this.state = { ...this.state, ...payload }
    return this;
  }

  updateProducts ({ products }) {
    this.productList.setState({ products });
    return this;
  }

  showLoading() {
    this.loading.setLoading({ visible: true });
    return this;
  }
  
  hideLoading() {
    this.loading.setLoading({ visible: false });
    return this;
  }

  updateProductInfo () {
    this.productInfo.setState({ productInfo: this.state.productInfo })
    return this;
  }

  updateSidebar () {
    this.sidebar.addRecentlyViewed(this.state.productInfo);
    return this;
  }

  showClickedProductInfo({ id, callback }) {
    api.getProductById(id)
      .then(res => {
        if (callback) {
          callback(res)
        };
        this.productInfo.showProductInfo({ 
          product: res, 
          visible: true 
        });
      })
  }
}

export default App;