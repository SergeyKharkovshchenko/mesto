import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  likeButton: '.element__heart',
  thrashbin: '.element__thrashbin'
}

const popupOpenButtonElementForEdit = document.querySelector('.profile__edit-button');
const popupOpenButtonElementForAdd = document.querySelector('.profile__add-button');
const nameField = document.querySelector('.popup__field-for-name');
const jobField = document.querySelector('.popup__field-for-job');

const initialCards = [{
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

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

function createCard(item) {
  const card = new Card({
    card: item,
    templateSelector: '#card_template',
    handleCardClick: () => {
      imagePopup.open(item.name, item.link);
    },
    config
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
}, '.elements');
defaultCardList.renderItems();


const popupAdd = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (evt, popupInputValues) => {
    evt.preventDefault();
    defaultCardList.addItem(createCard({
      name: popupInputValues.name,
      link: popupInputValues.link
    }));
  }
});
popupAdd.setEventListeners();
popupOpenButtonElementForAdd.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAdd.open()
});

const names = new UserInfo({
  userNameSelector: '.profile__title',
  jobDescriptionSelector: '.profile__subtitle'
});

const popupEdit = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (evt, popupInputValues) => {
    evt.preventDefault();
    names.setUserInfo({
      name: popupInputValues.name,
      description: popupInputValues.description
    });
  }
});
popupEdit.setEventListeners();
popupOpenButtonElementForEdit.addEventListener('click', () => {
  profileValidation.resetValidation();
  nameField.value = names.getUserInfo().name;
  jobField.value = names.getUserInfo().description;
  popupEdit.open();
});


// Включение валидации
  const formEditProfile = document.querySelector('.popup__form-edit');
  const formAddCard = document.querySelector('.popup__form-add');
    const profileValidation = new FormValidator(config, formEditProfile);
    const newCardValidation = new FormValidator(config, formAddCard);
    profileValidation.enableValidation();
    newCardValidation.enableValidation(); 
