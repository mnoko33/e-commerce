// lazy loading
function lazyLoad(target) {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-lazy");

                img.setAttribute("src", src);
                observer.unobserve(entry.target);
            }
        })
    })

    io.observe(target);
}

export default lazyLoad;