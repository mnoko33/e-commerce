class App {
  initialState = {
    products: [],
    productInfo: null,
    isLoadingVisible: false,
  }
  constructor($app) {
    this.$app = $app;
    this.state = this.initialState
    this.data = [];
    this.loadingVisibility = false;

    this.header = new Header($app);

    this.categoryList = new CategoryList({ 
      $app, 
      updateProducts: async (categoryName) => {
        this
          .showLoading()
          .setState({ products: await api.getProducts(categoryName) })
          .updateProducts()
          .hideLoading()
      }
    });

    this.productList = new ProductList({
      $app,
      initialData: this.state.data,
      handleProductClick: id => this.showClickedProductInfo({
        id,
        callback: (product) => this.sidebar.addRecentlyViewed(product)
      })
    })

    this.productInfo = new ProductInfo({ 
      $app, 
      product: null, 
      visible: false, 
    });
        
    this.sidebar = new Sidebar({ 
      $app,
      handleProductClick: id => this.showClickedProductInfo({ id }),
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
      .setState({ products: await api.getProducts('전체보기') })
      .updateProducts()
      .hideLoading()
  }

  setState(payload) {
    this.state = { ...this.state, ...payload }
    return this;
  }

  updateProducts () {
    this.productList.setState({ products: this.state.products });
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