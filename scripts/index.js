import {
  Card
} from './Card.js';

import {
  FormValidator
} from './FormValidator.js';

export const config = {
  // formSelector: '.popup__form',
  popup_set: '.popup__set',
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
const nameInputForEdit = document.querySelector('.popup__field-for-name_type_edit');
const jobInputForEdit = document.querySelector('.popup__field-for-job_type_edit');
const nameInputForAdd = document.querySelector('.popup__field-for-name_type_add');
const jobInputForAdd = document.querySelector('.popup__field-for-job_type_add');
const formInputForEdit = document.querySelector('.popup__form-edit');
const formInputForAdd = document.querySelector('.popup__form-add');
const popupElementForImage = document.querySelector('.image-popup');
const popupTitleElementForImage = document.querySelector('.image-popup__title');
const popupFotoElementForImage = document.querySelector('.image-popup__foto');
const popupOpenButtonElementForEdit = document.querySelector('.profile__edit-button');
const popupOpenButtonElementForAdd = document.querySelector('.profile__add-button');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements');
// const cardTemplate = document.querySelector('#card_template').content;

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

function handleCardClick(name, link) {
  // устанавливаем ссылку
  popupFotoElementForImage.src = link;
  // устанавливаем подпись картинке
  popupTitleElementForImage.textContent = name;
  popupFotoElementForImage.alt = name;
  // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
  openPopup(popupElementForImage);
}

function createCard(value) {
  const card = new Card(value, '#card_template', handleCardClick);
  const cardElement = card.generateCard();
 return cardElement
}

const addCard = function (value, index) {
  const cardElement = createCard(value)
  if (index != null) {
    cardsContainer.append(cardElement);
  } else {
    cardsContainer.prepend(cardElement);
  }
};

initialCards.forEach((value, index) => {
  addCard(value, index);
});

const openEditPopup = function () {
  nameInputForEdit.value = nameElement.textContent;
  jobInputForEdit.value = jobElement.textContent;
  openPopup(popupElementForEdit);
}

const openAddPopup = function (e) {
  openPopup(popupElementForAdd);
  formValidators['AddForm'].resetValidation();
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputForEdit.value;
  jobElement.textContent = jobInputForEdit.value;
  closePopup(popupElementForEdit);
}

function handleFormAddSubmit(e) {
  e.preventDefault();
  addCard({
    name: nameInputForAdd.value,
    link: jobInputForAdd.value
  });
  closePopup(popupElementForAdd);
  e.target.reset();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

popupOpenButtonElementForEdit.addEventListener('click', openEditPopup);
popupOpenButtonElementForAdd.addEventListener('click', openAddPopup);

formInputForEdit.addEventListener('submit', handleFormEditSubmit);
formInputForAdd.addEventListener('submit', handleFormAddSubmit);

// // находим все крестики проекта по универсальному селектору
// const closerButtons = document.querySelectorAll('.popup__close');
// closerButtons.forEach((button) => {
//   // находим 1 раз ближайший к крестику попап 
//   const popup = button.closest('.popup');
//   // устанавливаем обработчик закрытия на крестик
//   button.addEventListener('click', () => closePopup(popup));
// });

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// popupElementForEdit.addEventListener('click', function (e) {
//   if (e.target.classList.contains('popup_opened')) {
//     closePopup(e.target);
//   }
// });
// popupElementForAdd.addEventListener('click', function (e) {
//   if (e.target.classList.contains('popup_opened')) {
//     closePopup(e.target);
//   }
// });
// popupElementForImage.addEventListener('click', function (e) {
//   if (e.target.classList.contains('popup_opened')) {
//     closePopup(e.target);
//   }
// });


const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.popup_set))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   // записываем в объект под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};


// const enableValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(settings.popup_set));
//   formList.forEach((formElement) => {
//       const validatorFormElement = new FormValidator(settings, formElement);
//       validatorFormElement.setEventListeners();
//   });
// };

enableValidation(config);