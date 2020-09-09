class CategoryList {
  constructor({ $app, updateProductList }) {
    this.categoryList = document.createElement('div');
    this.categoryList.className = "category-list";
    $app.appendChild(this.categoryList);
    
    this.state = {
      list: ['전체보기', '아우터', '상의', '셔츠/블라우스', '팬츠/데님', '스커트', '원피스'],
      selectedIdx: 0,
    }

    this.updateProductList = updateProductList;

    this.render();
  }

  render() {
    this.categoryList.innerHTML = this.state.list.map(
      (categoryName, idx) => 
      `
        <div 
          class="${idx === this.state.selectedIdx ? 'category selected' : 'category'}" 
          data-name="${categoryName}"
        >${categoryName}</div>
      `
    ).join("");

    this.setCategoryClickListener();
  }

  changeClickedCategory(e) {
    const prevSelectedCategory = document.querySelectorAll('.category')[this.state.selectedIdx];
    const nextSelectedCategory = e.target;
    prevSelectedCategory.classList.remove('selected');
    nextSelectedCategory.classList.add('selected')

    this.state.selectedIdx = this.state.list.indexOf(e.target.dataset.name)
  }

  setCategoryClickListener() {
    document.querySelector('.category-list').addEventListener('click', e => {
      if (e.target !== e.currentTarget) {
        this.changeClickedCategory(e);
        this.updateProductList(e.target.dataset.name);
      }
    })
  }
}