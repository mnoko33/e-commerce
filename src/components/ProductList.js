class ProductList {
  constructor({ $app, initialData, handleProductClick }) {
    this.productList = document.createElement('div');
    this.productList.className = 'product-list';
    $app.appendChild(this.productList);

    this.state = {
      data: initialData,
    }

    this.handleProductClick = handleProductClick;

    // productList에 event delegation 적용
    this.productList.addEventListener('click', (e) => {
      if (e.target.className === 'product-img' || e.target.className === 'product-name') {
        e.stopPropagation();
        const clickedId = e.target.parentNode.dataset.id;
        const product = this.state.data.find(elem => elem.id == clickedId);
        if (product) {
          this.handleProductClick(product.id);
        }
      }
    })
  }

  updateProducts(newData) {
    this.state = { ...this.state, data: newData }
    this.render();
  }
  
  render() {
    this.productList.innerHTML = this.state.data.map(
      product => `
        <div class="product" data-id="${product.id}" id="product-${product.id}">
          <img class="product-img" data-lazy="${product.imgUrl}" alt="${product.name}" />
          <div class="product-name">제품명: ${product.name}</div>
          <div class="product-price">제품 가격: \\${convertWon(product.price)}</div>
          <div class="product-description">${product.description}</div>
        </div>
      `
    ).join("");
    
    // lazyloading 적용
    document.querySelectorAll('.product-img').forEach(img => lazyLoad(img));
  }
}