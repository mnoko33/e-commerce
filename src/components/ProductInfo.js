class ProductInfo {
  constructor({ $app, productInfo }) {
    this.bg = document.createElement('div');
    this.bg.className = 'bg';
    $app.appendChild(this.bg);

    this.state = { productInfo };
    this.keydownEscListener = null;
    
    this.render();
  }

  render() {
    const productInfo = this.state.productInfo;
    if (productInfo) {
      this.bg.innerHTML = `
        <div class="product-info">
          <div class="product-info-header">
            <h1>${productInfo.name}</h1>
          </div>
          <button id="close-btn">x</button>
          <div class="product-info-body">
            <div class="product-info-img">
              <img src="${productInfo.imgUrl}" alt="${productInfo.name}" />
            </div>
            <div class="product-info-content">
              <div class="product-info-category">카테고리: ${productInfo.category}</div>
              <div class="product-info-price">가격: \\${convertWon(productInfo.price)}</div>
              <div class="product-info-description">${productInfo.description}</div>
            </div>
          </div>
        </div>
      `;
      this.addClickEventListener();
      this.addEscKeydownListener();
    } else {
      this.bg.innerHTML = '';
    }
    this.toggleBg();
  }

  setState ({ productInfo }) {
    this.state = { ...this.state, productInfo }
    this.render();
  }

  toggleBg() {
    this.bg.classList.add(this.state.productInfo ? 'on' : 'off');
    this.bg.classList.remove(this.state.productInfo ? 'off' : 'on');
  }

  removeEscKeydownListener() {
    document.removeEventListener('keydown', this.keydownEscListener);
    this.keydownEscListener = null;
  }

  closeProductInfo() {
    this.state.productInfo = null;
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