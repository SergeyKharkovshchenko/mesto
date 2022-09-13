export default class Card {
  constructor(
    {
      card,
      templateSelector,
      handleCardClick,
      handleLikeClick,
      handleDeleteIconClick,
      config,
    },
    myUserId
  ) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._owner_id = card.owner._id;
    this._likesArray = card.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._element__foto = config.element__foto;
    this._likeButton = config.likeButton;
    this._thrashbin = config.thrashbin;
    this._element__title = config.element__title;
    this._element__likescounter = config.element__likescounter;
    this._myUserId = myUserId;
    this._blackLikeButton = config.blackLikeButton;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  setUpdatedLikesArray(card) {
    this._card.likes = card.likes;
    return this._card;
  }

  setUpdatedLikeArrayLength(newLength) {
    this._element.querySelector(this._element__likescounter).textContent =
      newLength;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._element__foto);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(this._element__title).textContent = this._name;
    this._element.querySelector(this._element__likescounter).textContent =
      this._likesArray.length;
    this._setEventListenersForCard(this._element);
    if (this._owner_id != this._myUserId)
      this._element.querySelector(this._thrashbin).remove();
    if (
      this._likesArray.some((userObj) => {
        return userObj._id === this._myUserId;
      })
    )
      this._element
        .querySelector(this._likeButton)
        .classList.add(this._blackLikeButton);
    return this._element;
  }

  _setEventListenersForCard() {
    this.likeButtonElement = this._element.querySelector(this._likeButton);
    this.likeButtonElement.addEventListener("click", () => {
      this._handleLikes();
    });

    this.thrashbinButtonElement = this._element.querySelector(this._thrashbin);
    this.thrashbinButtonElement.addEventListener("click", () => {
      this._handleThrashbin(this._element);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLikes() {
    this._handleLikeClick(this.likeButtonElement);
  }

  _handleThrashbin() {
    this._handleDeleteIconClick(this._id, this._element);
  }

  removeFromDom(element){
    element.remove();
    element = null;
}

}
