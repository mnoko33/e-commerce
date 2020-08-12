export { scrollToTop, infiniteScroll }

// 스크롤을 최상단으로 이동시키는 함수
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 무한 스크롤
function infiniteScroll() {
    function getScrollTop() {
        return (window.pageYOffset !== undefined) 
            ? window.pageYOffset 
            : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    function getDocumentHegith() {
        const body = document.body;
        const html = document.documentElement;
        
        return Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    }
    if (getScrollTop() + 50 >= getDocumentHegith() - window.innerHeight) {
        getAllProduct(makeProductList);
    }
}