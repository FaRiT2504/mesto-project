export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  addItem(element) {
    this._renderer(element, this._container);
  }

  renderItems(items) {
    items.slice().reverse().forEach(item => {
      this._renderer(item, this._container);
    });
  }
}
