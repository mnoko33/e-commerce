class Loading {
  constructor({ $app, visible }) {
    this.bg = document.createElement('div');
    this.bg.className = visible ? 'animation bg on' : 'animation bg off';
    $app.appendChild(this.bg);

    this.state = { visible }

    this.render();
  }

  render() {
    if (this.state.visible) {
      this.bg.innerHTML = `
        <div class="loading-box">
          ${'LOADING...'
            .split('')
            .map(letter => `<div class="loading-letter">${letter}</div>`)
            .join('')}
        </div>
        `;
      this.addAnimationEffect();
      this.bg.classList.add('on');
      this.bg.classList.remove('off');
    } else {
      this.bg.innerHTML = '';
      this.bg.classList.add('off')
      this.bg.classList.remove('on')
    }
  }

  setLoading ({ visible }) {
    this.state.visible = visible;
    this.render();
  }

  addAnimationEffect() {
    const loadingLetterList = document.querySelectorAll('.loading-letter');
    loadingLetterList.forEach((letter, idx) => {
      setTimeout(() => {
        letter.classList.add('move')
      }, 100 * idx);
    });
  }
}

export default Loading;