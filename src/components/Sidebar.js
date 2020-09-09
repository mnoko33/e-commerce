class Sidebar {
  MAX_QUEUE_SIZE = 3
  constructor({ $app, handleProductClick, MAX_QUEUE_SIZE }) {
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'sidebar hidden';
    $app.appendChild(this.sidebar);

    this.handleProductClick = handleProductClick;

    this.MAX_QUEUE_SIZE = MAX_QUEUE_SIZE;
    this.list = new recentlyViewedQueue(this.MAX_QUEUE_SIZE);
    this.visible = false;

    this.render();
  }

  setSidebar({ visible }) {
    this.visible = visible;
    document.querySelector('.sidebar-toggle-btn').innerText = this.visible ? '▶' : '◀';
    ['.sidebar-body', '.sidebar'].forEach(selector => {
      const target = document.querySelector(selector)
      if (this.visible) {
        target.classList.remove('hidden');
      } else {
        target.classList.add('hidden');
      }
    })
  }

  // 상품 리스트에서 상품을 클릭하면 해당 상품을 recentlyViewedQueue에 추가
  addRecentlyViewed = (product) => {
    this.list.push(product);
    this.renderRecentlyViewedItems();
  }

  // this.list를 화면에 렌더링하고 이벤트 리스너를 추가
  renderRecentlyViewedItems() {
    document.querySelector('.recently-viewed-wrapper').innerHTML = `
      ${this.list.getQ().map(
        product => `
          <div class="recently-viewed-product" data-id="${product.id}">
            <img src="${product.imgUrl}" width="110" alt="${product.name}">
            <div>${product.name}</div>
          </div>
        `
        ).join("")
      }
    `;
    
    const recentlyViewedItems = document.querySelectorAll('.recently-viewed-product')
    recentlyViewedItems.forEach(item => item.addEventListener('click', e => {
      const selectedId = e.currentTarget.dataset.id;
      const product = this.list.getQ().find(item => item.id == selectedId);
      if (product) {
        this.handleProductClick(product.id);
      }
    }))
  }

  render() {
    const LEFT = '◀';
    const RIGHT = '▶';
    this.sidebar.innerHTML = `
      <div class="sidebar-toggle-btn">${this.visible ? RIGHT : LEFT}</div>
      <div class="sidebar-body hidden">
        <div class="recently-viewed">최근 본 상품</div>
        <div class="recently-viewed-wrapper"></div>
      </div>
    `

    document.querySelector('.sidebar-toggle-btn').addEventListener("click", () => {
      this.setSidebar({ visible: !this.visible })
    });
  }
}