class ProductInfo {
    constructor({ $app, product, visible }) {
        this.bg = document.createElement('div');
        this.bg.className = 'bg';
        $app.appendChild(this.bg);

        this.state = { product, visible };
        
        this.render();
    }

    showProductInfo({ product, visible }) {
        this.state = { product, visible }
        this.render();
    }

    closeProductInfo() {
        this.state = { ...this.state, visible: false };
        this.render();
    }

    render() {
        const product = this.state.product;
        if (this.state.visible) {
            this.bg.innerHTML = `
                <div class="product-info">
                    <div class="product-info-header">
                        <h1>${product.name}</h1>
                    </div>
                    <button id="close-btn">x</button>
                    <div class="product-info-body">
                        <div class="product-info-img">
                            <img src="${product.imgUrl}" alt="${product.name}" />
                        </div>
                        <div class="product-info-content">
                            <div class="product-info-category">카테고리: ${product.category}</div>
                            <div class="product-info-price">가격: \\${convertWon(product.price)}</div>
                            <div class="product-info-description">${product.description}</div>
                        </div>
                    </div>
                </div>
            `;
            this.bg.style.display = "block";
            document.querySelector('#close-btn').addEventListener("click", () => {
                this.closeProductInfo();
            }, { once: true });
            document.querySelector('.bg').addEventListener("click", (e) => {
                if (e.target.className === 'bg') {
                    this.closeProductInfo();
                }
            });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    this.closeProductInfo();
                }
            }, { once: true })
        } else {
            this.bg.style.display = "none";
        }
    }
}