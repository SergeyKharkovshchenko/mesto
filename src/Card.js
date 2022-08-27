import {
  config
} from './index.js';
import {initialCards} from './index.js';

export class Card {

  constructor({card, templateSelector, handleCardClick}) {
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
      this._handleHeart(_element);
    });

    this.thrashbinButtonElement = _element.querySelector(config.thrashbin);
    this.thrashbinButtonElement.addEventListener('click', () => {
      this._handleThrashbin(_element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  _handleHeart(_element) {
    this.likeButtonElement.classList.toggle('element__heart-color-black');
  }

  _handleThrashbin(_element) {
    initialCards.pop();
    this.thrashbinButtonElement.closest('.element').remove();
  }

}

