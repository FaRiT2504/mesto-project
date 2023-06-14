export default class Section {
  constructor({ items, renderer }) {
    this._renderedItems = items;
    this._renderer = renderer;
  }

  addItem(element) {
    this._renderer(element);
  }

  renderItems() {
    this._renderedItems.then(items => {
      items.slice().reverse().forEach(item => {
        this._renderer(item);
      });
    })
  }
}
