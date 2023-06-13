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
      items.forEach(item => {
        this._renderer(item);
      });
    })
  }
}

// //функция добавления карточек(реализация колбека в index.js)
// function addСard(titleValue, linkValue, data) {
//   //вызываю функцию создания карточек
//   const element = createCard(titleValue, linkValue, data);
//   //добавляю новую карточку в DOM
//   cards.prepend(element);
// }
