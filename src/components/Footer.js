class Footer {
  constructor($app) {
    this.$app = $app;
    this.footer = document.createElement('footer');
    this.footer.className = 'footer';
    this.$app.appendChild(this.footer);

    this.render();
  }

  render() {
    this.footer.innerHTML = `
      <a target="_blank" href="https://github.com/mnoko33/e-commerce">
        <img class="github-logo" src="../images/github.png" alt="github">
      </a>
      <div>E-COMMERCE PJT</div>
    `;
  }
}