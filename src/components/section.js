export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

// //функция добавления карточек(реализация колбека в index.js)
// function addСard(titleValue, linkValue, data) {
//   //вызываю функцию создания карточек
//   const element = createCard(titleValue, linkValue, data);
//   //добавляю новую карточку в DOM
//   cards.prepend(element);
// }
