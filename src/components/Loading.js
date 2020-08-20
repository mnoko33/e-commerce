class Loading {
    constructor({ $app, visible }) {
        this.bg = document.createElement('div');
        this.bg.classList.add('animation');
        this.bg.classList.add('bg');
        $app.appendChild(this.bg);

        this.state = { visible }

        this.render();
    }
    
    toggleVisibility({ visible }) {
        this.state = { ...this.state, visible }
        this.render();

    }

    render() {
        const visible = this.state.visible;
        this.bg.style.display = visible ? "block" : "none";
        
        if (visible) {
            this.bg.innerHTML = 
            `
            <div class="loading-box">
                <div class="loading-letter">L</div>
                <div class="loading-letter">O</div>
                <div class="loading-letter">A</div>
                <div class="loading-letter">D</div>
                <div class="loading-letter">I</div>
                <div class="loading-letter">N</div>
                <div class="loading-letter">G</div>
                <div class="loading-letter">.</div>
                <div class="loading-letter">.</div>
                <div class="loading-letter">.</div>
            </div>
            `;
        } else {
            this.bg.innerHTML = '';
        }

        // 애니메이션 적용하기 위한 move class 추가
        const loadingLetterList = document.querySelectorAll('.loading-letter');
        if (visible) {
            loadingLetterList.forEach((letter, idx) => {
                setTimeout(() => {
                    letter.classList.add('move')
                }, 100 * idx);
            });
        } else {
            loadingLetterList.forEach(letter => {
                letter.classList.remove('move');
            })
        }
    }
}