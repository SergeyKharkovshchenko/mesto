export default class Section {
  constructor({
    renderer
  }) {
    this._renderer = renderer;
    this._container = document.querySelector('.elements');
  }

  renderItems(initialArray) {
    initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

}