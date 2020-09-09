class App {
  constructor($app) {
    this.$app = $app;
    this.data = [];
    this.loadingVisibility = false;

    this.header = new Header($app);

    this.categoryList = new CategoryList({ 
      $app, 
      updateProductList: (categoryName) => {
        api.getProducts(categoryName)
          .then(newData => this.updateData(newData))
      }
    });

    this.productList = new ProductList({
      $app,
      initialData: this.data,
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
      visible: true,
    });

    api.getProducts('전체보기').then(newData => {
      setTimeout(() => {
        this.updateData(newData)
        this.loading.setLoading({ visible: false });
      }, 500);
    });
  }

  updateData(newData) {
    this.data = newData;
    this.productList.updateProducts(newData);
  }

  beforeFetchApi() {
    this.loading.setLoading({ visible: true });
  }

  beforeUpdateData() {
    this.loading.setLoading({ visible: false });
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

  fetchGetProductsApi(categoryName) {
    this.beforeFetchApi();
    api.getProducts(categoryName)
      .then(newData => {
        this.beforeUpdateData();
        this.updateData(newData);
      })
  }
}