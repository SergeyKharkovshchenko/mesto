import '../pages/index.css';
// import './pages/index.css';


import {
  Card
} from './Card.js';

import {
  FormValidator
} from './FormValidator.js';

import {
  Section
} from './Section.js';

import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


export const config = {
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


const popupElementForEdit = document.querySelector('.popup_edit');
const popupElementForAdd = document.querySelector('.popup_add');
const popupElementForImage = document.querySelector('.image-popup');
const popupOpenButtonElementForEdit = document.querySelector('.profile__edit-button');
const popupOpenButtonElementForAdd = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');

export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    // link: './images/dombai.png'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCards(){
const defaultCardList = new Section({ items: initialCards , 
  renderer: (item) => {
    const card = new Card
    ({
      card: item, 
      templateSelector: '#card_template', 
      handleCardClick: () => {
        const openPopupImage = new PopupWithImage(popupElementForImage);
        openPopupImage.openPopup(item.name, item.link);
        openPopupImage.setEventListeners();}});
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsContainer);
defaultCardList.renderItems();
}

createCards();





const popupAdd = new PopupWithForm({
  popupSelector:popupElementForAdd,
  handleFormSubmit: (evt, popupInputValues) => {
      evt.preventDefault();  
      initialCards.unshift({name: popupInputValues.name, link: popupInputValues.link });
      createCards();
      evt.target.reset();
  }
});
popupAdd.setEventListeners();
popupOpenButtonElementForAdd.addEventListener('click', () => {popupAdd.openPopup()});




const popupEdit = new PopupWithForm ({
  popupSelector:popupElementForEdit,
  handleFormSubmit: (evt, popupInputValues) => {
      evt.preventDefault();
    const names = new UserInfo();
    names.setUserInfo();
    popupEdit.closePopup();
  }
}); 
popupEdit.setEventListeners();
popupOpenButtonElementForEdit.addEventListener('click', () => {popupEdit.openPopup()});


const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   // записываем в объект под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);