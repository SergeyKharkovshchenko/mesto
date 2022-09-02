
export default class Card {

  constructor({
    card,
    templateSelector,
    handleCardClick,
    config
  }) {
    this._data = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element__foto = config.element__foto;
    this._likeButton = config.likeButton;
    this._thrashbin = config.thrashbin;
    this._element__title = config.element__title;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    const _element = this._getTemplate();
    this._cardImage = _element.querySelector(this._element__foto);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    _element.querySelector(this._element__title).textContent = this._name;
    this._setEventListenersForCard(_element);
    return _element;
  }

  _setEventListenersForCard(_element) {
    this.likeButtonElement = _element.querySelector(this._likeButton);
    this.likeButtonElement.addEventListener('click', () => {
      this._handleHeart();
    });

    this.thrashbinButtonElement = _element.querySelector(this._thrashbin);
    this.thrashbinButtonElement.addEventListener('click', () => {
      this._handleThrashbin(_element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleHeart() {
    this.likeButtonElement.classList.toggle('element__heart-color-black');
  }

  _handleThrashbin(_element) {
    _element.remove();
    _element = null;
  }

}