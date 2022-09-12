export default class Api {
    constructor(setting) { 
        this._address = setting.baseUrl; 
        this._headers = setting.headers; 
    }

    getUserInfo() { 
        return fetch(`${this._address}users/me`, { 
            method: "GET", 
            headers: this._headers,
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getInitialCards() {
        return fetch(`${this._address}cards`, {
      headers: this._headers
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
    }

    getUserAndCards(){
      return Promise.all ([this.getUserInfo(),this.getInitialCards()])
    }


    setUserInfo(name, about){
         return fetch(`${this._address}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
    })        
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

addMyCardToCloud(data){
   return fetch(`${this._address}cards`, {
     method: 'POST',
     headers: this._headers,
     body: JSON.stringify({
       name: data.name,
       link: data.link
     })
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});
}

deleteCardFromCloud(id){
  return fetch(`${this._address}cards/${id}`, {
    method: 'DELETE',
    headers: this._headers
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});
}

setNewAvatar(newAvatarLink){
  return fetch(`${this._address}users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      })
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});
}

// item._id, myUser, item.likes

handleLikesOnCloud(data, myUser){
  if (! data.likes.some( (userObj) => { 
    return userObj._id === myUser._id})) 
    {
  return fetch(`${this._address}/cards/${data._id}/likes`, {
    method: 'PUT',
    headers: this._headers,
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});
} 
else 
{
return fetch(`${this._address}/cards/${data._id}/likes`, {
  method: 'DELETE',
  headers: this._headers,
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});
}
}


}


