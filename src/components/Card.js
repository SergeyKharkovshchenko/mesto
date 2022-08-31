const config = {
  // formSelector: '.popup__form',
  formSelector: '.popup__set',
  // inputSelector: '.popup__input',
  popup_field: '.popup__field',
  // submitButtonSelector: '.popup__button',
  submit_button: '.popup__submit-button',
  // inactiveButtonClass: 'popup__button_disabled',
  button_invalid: 'popup__submit-button_activity_invalid',
  // inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  element__foto: '.element__foto',
  element__title: '.element__title',
  _likeButton: '.element__heart',
  thrashbin: '.element__thrashbin'
}

export default class Card {

  constructor({
    card,
    templateSelector,
    handleCardClick
  }) {
    this._data = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = _element.querySelector(config.element__foto);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    _element.querySelector(config.element__title).textContent = this._name;
    this._setEventListenersForCard(_element);
    return _element;
  }

  _setEventListenersForCard(_element) {
    this.likeButtonElement = _element.querySelector(config._likeButton);
    this.likeButtonElement.addEventListener('click', () => {
      this._handleHeart();
    });

    this.thrashbinButtonElement = _element.querySelector(config.thrashbin);
    this.thrashbinButtonElement.addEventListener('click', () => {
      this._handleThrashbin(_element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
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