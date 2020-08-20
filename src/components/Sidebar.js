class Sidebar {
    constructor({ $app, handleSidebarClick, handleProductClick }) {
        this.sidebar = document.createElement('div');
        this.sidebar.className = 'sidebar';
        $app.appendChild(this.sidebar);

        this.handleSidebarClick = handleSidebarClick;
        this.handleProductClick = handleProductClick;

        this.state = {
            list: [],
            itemLimit: 3,
            toggle: false,
        }

        this.render();
    }

    toggle = () => {
        this.state = { ...this.state, toggle: !this.state.toggle }
        const toggle = this.state.toggle;
        const sidebarBody = document.querySelector('.sidebar-body')
        this.sidebar.style.width = toggle ? "180px" : "50px";
        sidebarBody.style.right = toggle ?  "0px" : "-130px";
        sidebarBody.style.padding = toggle ? "0px 10px 10px" : "0px";
        document.querySelector('.sidebar-body').style.right = toggle ?  "0px" : "-130px";
        document.querySelector('.sidebar-toggle-btn').innerText = toggle ? "▶" : "◀";
    }

    addRecentlyViewed = (product) => {
        const list = this.state.list;
        const idx = list.findIndex(item => product.id === item.id);
        if (idx > -1) {
            list.splice(idx, 1);
        } else if (list.length >= this.state.itemLimit) {
            list.shift();
        }
        list.push(product);
        document.querySelector('.recently-viewed-wrapper').innerHTML = `
            ${this.state.list.map(
                product => `
                    <div class="recently-viewed-product" id="product-${product.id}">
                        <img src="${product.imgUrl}" width="110" alt="${product.name}">
                        <div>${product.name}</div>
                    </div>
                `
                ).join("")
            }
        `;

        const recentlyViewedBox = document.querySelector('.sidebar-body');

        recentlyViewedBox.addEventListener("click", (e) => {
            const clickedProduct = e.target.parentNode
            if (clickedProduct.className === 'recently-viewed-product') {
                e.stopPropagation();
                console.log()
                const clikedId = clickedProduct.id.split('-')[1];
                const product = this.state.list.find(elem => elem.id == clikedId)
                if (product) {
                    this.handleProductClick(product);
                }
            }
        })
    }

    render() {
        const LEFT = '◀';
        const RIGHT = '▶';
        this.sidebar.innerHTML = `
            <div class="sidebar-toggle-btn">${this.state.toggle ? RIGHT : LEFT}</div>
            <div class="sidebar-body">
                <div class="recently-viewed">최근 본 상품</div>
                <div class="recently-viewed-wrapper"></div>
            </div>
        `
        document.querySelector('.sidebar-toggle-btn').addEventListener("click", this.toggle);
    }
}