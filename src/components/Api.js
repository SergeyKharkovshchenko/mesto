export default class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._address}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._address}cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  setUserInfo(name, about) {
    return fetch(`${this._address}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addMyCardToCloud(data) {
    return fetch(`${this._address}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCardFromCloud(id) {
    return fetch(`${this._address}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setNewAvatar(newAvatarLink) {
    return fetch(`${this._address}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then((res) => this._getResponseData(res));
  }

  handleLikesOnCloud(card, myUser) {
    if (
      !card.likes.some((userObj) => {
        return userObj._id === myUser._id;
      })
    ) {
      return fetch(`${this._address}/cards/${card._id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this._address}/cards/${card._id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    }
  }
}