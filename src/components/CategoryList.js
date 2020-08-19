class CategoryList {
    constructor({ $app, handleCategoryClick, updateProductList }) {
        this.$categoryList = document.createElement('div');
        this.$categoryList.className = "category-list";
        $app.appendChild(this.$categoryList);
        
        this.state = {
            list: ['전체보기', '아우터', '상의', '셔츠/블라우스', '팬츠/데님', '스커트', '원피스'],
            idx: 0,
        }

        this.handleCategoryClick = handleCategoryClick
        this.updateProductList = updateProductList;

        this.render();
    }

    render() {
        this.$categoryList.innerHTML = this.state.list.map(
            (categoryName, idx) => {
                if (idx === 0) {
                    return `<div class="category selected">${categoryName}</div>` 
                } else {
                    return `<div class="category">${categoryName}</div>`
                }
            }).join("");

        this.$categoryList.querySelectorAll('.category').forEach(($category, idx) => {
            $category.addEventListener("click", (e) => {
                if (this.state.idx !== idx) {
                    this.handleCategoryClick(e);
                    this.state = { ...this.state, idx }
                }
                this.updateProductList(this.state.list[idx]);
            });
        })
    }
}