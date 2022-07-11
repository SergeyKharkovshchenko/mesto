const popupElementForEdit = document.querySelector('.popup_edit');
const popupElementForAdd = document.querySelector('.popup_add');
const nameInputForEdit = document.querySelector('.popup__field-for-name_type_edit');
const jobInputForEdit = document.querySelector('.popup__field-for-job_type_edit');
const nameInputForAdd = document.querySelector('.popup__field-for-name_type_add');
const jobInputForAdd = document.querySelector('.popup__field-for-job_type_add');

const formInputForEdit = document.querySelector('.popup__formtype_edit');
const formInputForAdd = document.querySelector('.popup__formtype_add');

const popupElementForImage = document.querySelector('.image-popup');
const popupTitleElementForImage = document.querySelector('.image-popup__title');
const popupFotoElementForImage = document.querySelector('.image-popup__foto');
const popupOpenButtonElementForEdit = document.querySelector('.profile__edit-button');
const popupOpenButtonElementForAdd = document.querySelector('.profile__add-button');
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



const handleHeart = function (e) {
    e.target.closest('.element__heart').classList.toggle('element__heart-color-black');
}

const handleThrashbin = function (e) {
    // let nameOfLocation = e.target.closest('.element').querySelector('.element__title').textContent;
    // initialCards.forEach((value, index) => removeFromArray(value.name, nameOfLocation, index));
    e.target.closest('.element').remove();
   
}

const handleFoto = function (e) {
    openPopup(popupElementForImage);
    popupTitleElementForImage.textContent = e.target.closest('.element').querySelector('.element__title').textContent;
    popupFotoElementForImage.src = e.target.closest('.element').querySelector('.element__foto').src;
    popupFotoElementForImage.alt = e.target.closest('.element').querySelector('.element__title').textContent;; // ? name : initialCards[index].name;
}


function createCard(name, link) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  // наполняем содержимым
const foto = cardElement.querySelector('.element__foto');
  foto.src = link; // ? link : initialCards[index].link;
  foto.alt = name; // ? name : initialCards[index].name;
  cardElement.querySelector('.element__title').textContent = name; //? name : initialCards[index].name;
return cardElement
}

const addListenersToCard = function (index) {
  const likeButtonElement = document.querySelectorAll('.element__heart');
  likeButtonElement[index].addEventListener('click', handleHeart);
  const thrashbinButtonElement = document.querySelectorAll('.element__thrashbin');
  thrashbinButtonElement[index].addEventListener('click', handleThrashbin);
  const fotoButtonElement = document.querySelectorAll('.element__foto');
  fotoButtonElement[index].addEventListener('click', handleFoto);
}

  const addCard = function (name, link, index) {
    let counter = 0;
    const cardElement = createCard(name, link)
  // отображаем на странице
  if (index != null) {
  cards.append(cardElement);
  addListenersToCard(index);
   counter++;
  } else {
    cards.prepend(cardElement);
    addListenersToCard(counter);
  
    // initialCards.unshift({
    //   name,
    //   link
    // });
  }

}

initialCards.forEach((value, index) => addCard(value.name, value.link, index));

const openEditPopup = function () {
    nameInputForEdit.value = nameElement.textContent;
    jobInputForEdit.value = jobElement.textContent;
  openPopup(popupElementForEdit);

}

const openAddPopup = function (e) {
  openPopup(popupElementForAdd);
    nameInputForAdd.value = "";
    jobInputForAdd.value = "";
}


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInputForEdit.value ? nameInputForEdit.value : nameElement.textContent;
  jobElement.textContent = jobInputForEdit.value ? jobInputForEdit.value : jobElement.textContent;
  closePopup(popupElementForEdit);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  addCard(nameInputForAdd.value, jobInputForAdd.value);
  closePopup(popupElementForAdd);
}

// function removeFromArray(nameInArray, nameInDeletedCard, index) {
//   if (nameInArray == nameInDeletedCard) {
//     initialCards.splice(index, 1);
//   }
// }

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}



popupOpenButtonElementForEdit.addEventListener('click', openEditPopup);
popupOpenButtonElementForAdd.addEventListener('click', openAddPopup);

formInputForEdit.addEventListener('submit', handleFormEditSubmit);
formInputForAdd.addEventListener('submit', handleFormAddSubmit);



// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});



