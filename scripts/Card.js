export class Card {

  constructor(card, templateSelector, handleFoto) {
    this._data = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleFoto = handleFoto;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector('#card_template')
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    if (this._templateSelector == 'template1') {
      const _element = this._getTemplate();
      const foto = _element.querySelector('.element__foto');
      foto.src = this._link;
      foto.alt = this._name;
      _element.querySelector('.element__title').textContent = this._name;
      this._setEventListenersForCard(_element);
      return _element;
    }
  }

  _setEventListenersForCard(_element) {
    const likeButtonElement = _element.querySelector('.element__heart');
    likeButtonElement.addEventListener('click', () => {
      this._handleHeart(_element);
    });

    const thrashbinButtonElement = _element.querySelector('.element__thrashbin');
    thrashbinButtonElement.addEventListener('click', () => {
      this._handleThrashbin(_element);
    });

    const fotoButtonElement = _element.querySelector('.element__foto');
    fotoButtonElement.addEventListener('click', () => {
      this._handleFoto(_element);
      //   fotoButtonElement.addEventListener('click', handleFoto);
    });


  }

  _handleHeart(_element) {
    const likeButtonElement = _element.querySelector('.element__heart');
    likeButtonElement.classList.toggle('element__heart-color-black');
  }

  _handleThrashbin(_element) {
    const thrashbinButtonElement = _element.querySelector('.element__thrashbin');
    thrashbinButtonElement.closest('.element').remove();
  }

}