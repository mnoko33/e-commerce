class Header {
  constructor($app) {
    this.header = document.createElement('header');
    this.header.className = "header";
    this.header.innerHTML = `<h1 class="title">E-COMMERCE</h1>`;
    $app.appendChild(this.header);
  }
}