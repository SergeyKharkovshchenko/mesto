const popupElement = document.querySelector('.popup');
const popupElementforEdit = document.querySelector('.popup_edit');
const popupElementforAdd = document.querySelector('.popup_add');
const popupCloseButtonElementForEdit = popupElementforEdit.querySelector('.popup__close_type_edit');
const popupCloseButtonElementForAdd = popupElementforAdd.querySelector('.popup__close_type_add');
const popupSubmitButtonElementForEdit = popupElementforEdit.querySelector('.popup__submit-button_type-edit');
const popupSubmitButtonElementForAdd = popupElementforAdd.querySelector('.popup__submit-button_type-add');
const nameInputforEdit = document.querySelector('.popup__field-for-name_type_edit');
const jobInputforEdit = document.querySelector('.popup__field-for-job_type_edit');
const nameInputforAdd = document.querySelector('.popup__field-for-name_type_add');
const jobInputforAdd = document.querySelector('.popup__field-for-job_type_add');
const popupElementforImage = document.querySelector('.image-popup');
const popupCloseButtonElementforImage = popupElementforImage.querySelector('.image-popup__close');
const popupTitleElementforImage = document.querySelector('.image-popup__title');
const popupFotoElementforImage = document.querySelector('.image-popup__foto');
const popupOpenButtonElementforEdit = document.querySelector('.profile__edit-button');
const popupOpenButtonElementforAdd = document.querySelector('.profile__add-button');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card_template').content;


const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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




const addCard = function (name, link, index) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector('.element__foto').src = link; // ? link : initialCards[index].link;
  cardElement.querySelector('.element__foto').alt = name; // ? name : initialCards[index].name;
  cardElement.querySelector('.element__title').textContent = name; //? name : initialCards[index].name;
  // отображаем на странице
  if (index != null) {
    cards.append(cardElement);
  } else {
    cards.prepend(cardElement);
    initialCards.unshift({
      name,
      link
    });
  }
}

initialCards.forEach((value, index) => addCard(value.name, value.link, index));

const openEditPopup = function () {
  if (this.className == "profile__edit-button") {
    nameInputforEdit.value = nameElement.textContent;
    jobInputforEdit.value = jobElement.textContent;
  }
  popupElementforEdit.classList.add('popup_is-opened');
  popupElementforEdit.classList.remove('popup_was-opened');
}

const openAddPopup = function () {
  if (this.className == "profile__add-button") {
    nameInputforAdd.value = "Название"
    jobInputforAdd.value = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";
  }
  popupElementforAdd.classList.add('popup_is-opened');
  popupElementforAdd.classList.remove('popup_was-opened');
}

const closePopupforEdit = function () {
  popupElementforEdit.classList.remove('popup_is-opened');
  nameInputforEdit.value = "";
  jobInputforEdit.value = "";
  popupElementforEdit.classList.add('popup_was-opened');
}

const closePopupforAdd = function () {
  popupElementforAdd.classList.remove('popup_is-opened');
  popupElementforAdd.classList.add('popup_was-opened');
}

const closePopupForImage = function () {
  popupElementforImage.classList.add('image-popup_was-opened');
  popupElementforImage.classList.remove('image-popup_is-opened');

}

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputforEdit.value ? nameInputforEdit.value : nameElement.textContent;
  jobElement.textContent = jobInputforEdit.value ? jobInputforEdit.value : jobElement.textContent;
  popupElementforEdit.classList.add('popup_was-opened');
  popupElementforEdit.classList.remove('popup_is-opened');
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  addCard(nameInputforAdd.value, jobInputforAdd.value);
  popupElementforAdd.classList.add('popup_was-opened');
  popupElementforAdd.classList.remove('popup_is-opened');
}

function removeFromArray(nameInArray, nameInDeletedCard, index) {
  if (nameInArray == nameInDeletedCard) {
    initialCards.splice(index, 1);
  }
}

const CardHandler = function (e) {
  if (e.target.matches('.element__thrashbin')) {
    let nameOfLocation = e.target.closest('.element').querySelector('.element__title').textContent;
    initialCards.forEach((value, index) => removeFromArray(value.name, nameOfLocation, index));
    e.target.closest('.element').remove();
  } else if (e.target.matches('.element__heart')) {
    e.target.closest('.element__heart').classList.toggle('element__heart-color-black');
  } else if (e.target.matches('.element__foto')) {
    popupElementforImage.classList.remove('image-popup_was-opened');
    popupElementforImage.classList.add('image-popup_is-opened');
    popupTitleElementforImage.textContent = e.target.closest('.element').querySelector('.element__title').textContent;
    popupFotoElementforImage.src = e.target.closest('.element').querySelector('.element__foto').src;
  }
}


popupOpenButtonElementforEdit.addEventListener('click', openEditPopup);
popupOpenButtonElementforAdd.addEventListener('click', openAddPopup);
popupSubmitButtonElementForEdit.addEventListener('click', formEditSubmitHandler);
popupSubmitButtonElementForAdd.addEventListener('click', formAddSubmitHandler);
popupCloseButtonElementforImage.addEventListener('click', closePopupForImage);
popupCloseButtonElementForEdit.addEventListener('click', closePopupforEdit);
popupCloseButtonElementForAdd.addEventListener('click', closePopupforAdd);

// reference to a listformAddSubmitHandler
const list = document.querySelector('.elements');
// add a single listener on list item
list.addEventListener('click', CardHandler);