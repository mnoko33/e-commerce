console.log("App is running");

class App {
    constructor($app) {
        this.$app = $app;
        this.data = [];
        api.getProducts('전체보기').then(newData => {
            this.updateData(newData)
        });

        this.header = new Header($app);

        this.categoryList = new CategoryList({ 
            $app, 
            handleCategoryClick: e => {
                const CLASS_NAME = "selected";
                const targetUpdated = e.target;
                const targetRemoved = document.querySelector(`.${CLASS_NAME}`);
                
                targetUpdated.classList.add(CLASS_NAME);
                targetRemoved.classList.remove(CLASS_NAME);
            },
            updateProductList: (categoryName) => {
                api.getProducts(categoryName)
                    .then(newData => this.updateData(newData))
            }
        });

        this.productList = new ProductList({
            $app,
            initialData: this.data,
            handleProductClick: (product) => {
                this.productInfo.showProductInfo({ 
                    product, 
                    visible: true 
                });
            }
        })

        this.productInfo = new ProductInfo({ 
            $app, 
            product: null, 
            visible: false, 
        });

        this.footer = new Footer($app);
    }

    updateData(newData) {
        this.data = newData;
        this.productList.updateProducts(newData);
    }
}