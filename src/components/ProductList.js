class ProductList {
    constructor({ $app, initialData, handleProductClick }) {
        this.$productList = document.createElement('div');
        this.$productList.className = 'product-list';
        $app.appendChild(this.$productList);

        this.state = {
            data: initialData,
        }

        this.handleProductClick = handleProductClick;
    }

    updateProducts(newData) {
        this.state = { ...this.state, data: newData }
        this.render();
    }

    render() {
        this.$productList.innerHTML = this.state.data.map(
            product => `
                <div class="product">
                    <img class="product-img" data-lazy="${product.imgUrl}" alt="${product.name}" />
                    <div class="product-name">제품명: ${product.name}</div>
                    <div class="product-price">제품 가격: \\${convertWon(product.price)}</div>
                    <div class="product-description">${product.description}</div>
                </div>
            `
        ).join("");
        
        // lazyloading 적용
        document.querySelectorAll('.product-img').forEach(img => lazyLoad(img));
        
        // TODO: event delegation으로 수정해보자
        document.querySelectorAll('.product').forEach((product, idx) => {
            product.addEventListener("click", () => {
                this.handleProductClick(this.state.data[idx])
            });
        });
    }
}