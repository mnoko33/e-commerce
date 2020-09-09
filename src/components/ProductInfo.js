class ProductInfo {
  constructor({ $app, product, visible }) {
    this.bg = document.createElement('div');
    this.bg.className = this.visible ? 'bg on' : 'bg off';
    $app.appendChild(this.bg);

    this.state = { product, visible };
    this.keydownEscListener = null;
    
    this.render();
  }

  render() {
    if (this.state.visible) {
      const { product } = this.state;
      this.toggleBg();
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
      this.addClickEventListener();
      this.addEscKeydownListener();

    } else {
      this.toggleBg();
      this.bg.innerHTML = '';
    }
  }

  toggleBg() {
    this.bg.classList.add(this.state.visible ? 'on' : 'off');
    this.bg.classList.remove(this.state.visible ? 'off' : 'on');
  }

  showProductInfo({ product, visible }) {
    this.state = { product, visible }
    this.render();
  }

  removeEscKeydownListener() {
    document.removeEventListener('keydown', this.keydownEscListener);
    this.keydownEscListener = null;
  }

  closeProductInfo() {
    this.state.visible = false;
    this.removeEscKeydownListener();
    this.render();
  }

  addClickEventListener() {
    document.querySelector('.bg').addEventListener('click', e => {
      if (e.target.id === 'close-btn' || e.target.classList.contains('bg')) {
        this.closeProductInfo();
      }
    })
  }

  addEscKeydownListener() {
    this.keydownEscListener = e => {
      if (e.key === 'Escape') {
        this.closeProductInfo();
      }
    }
    document.addEventListener('keydown', this.keydownEscListener);
  }
}