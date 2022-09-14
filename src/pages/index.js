import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const config = {
  // formSelector: '.popup__form',
  formSelector: ".popup__set",
  // inputSelector: '.popup__input',
  popup_field: ".popup__field",
  // submitButtonSelector: '.popup__button',
  submit_button: ".popup__submit-button",
  // inactiveButtonClass: 'popup__button_disabled',
  button_invalid: "popup__submit-button_activity_invalid",
  // inputErrorClass: 'popup__input_type_error',
  errorClass: "popup__error_visible",
  element__foto: ".element__foto",
  element__title: ".element__title",
  likeButton: ".element__heart",
  thrashbin: ".element__thrashbin",
  element__likescounter: ".element__likescounter",
  element__deleteconfirmation: ".element__deleteconfirmation",
  blackLikeButton: "element__heart-color-black",
};

const popupOpenButtonElementForEdit = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonElementForAdd = document.querySelector(
  ".profile__add-button"
);
const popupOpenButtonElementForAvatar =
  document.querySelector(".profile__card");
const nameField = document.querySelector(".popup__field-for-name");
const jobField = document.querySelector(".popup__field-for-job");
const profile__avatar = document.querySelector(".profile__avatar");

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-50/",
  headers: {
    authorization: "9437105d-f22c-4ac9-bb21-2171c030d2d7",
    "Content-Type": "application/json",
  },
});

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item, names.getUserInfo()));
  },
});

const popupAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (evt, popupInputValues) => {
    evt.preventDefault();
    popupAdd.renameButton("Сохранение...");
    api
      .addMyCardToCloud(popupInputValues)
      .then((res) =>
        defaultCardList.addItem(createCard(res, names.getUserInfo()))
      )
      .then(() => popupAdd.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAdd.renameButton("Создать"));
  },
});
popupAdd.setEventListeners();
popupOpenButtonElementForAdd.addEventListener("click", () => {
  newCardValidation.resetValidation();
  popupAdd.open();
});

api
  .getUserAndCards()
  .then((argument) => {
    const [dataFromGetUserInfoPromis, dataFromGetInitialCardsPromise] =
    argument;
    names.setUserInfo(dataFromGetUserInfoPromis);
    defaultCardList.renderItems(dataFromGetInitialCardsPromise);
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item, myUser) {
  const card = new Card({
      card: item,
      templateSelector: "#card_template",
      handleCardClick: () => {
        imagePopup.open(item);
      },
      handleLikeClick: () => {
        api
          .handleLikesOnCloud(item, myUser)
          .then((res) => card.setUpdatedLikesArray(res))
          .then((res) => card.setUpdatedLikeArrayLength(res.likes.length))
          .then(() =>
            card.toggleLikeColor()
          )
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteIconClick: (id) => {
        popupDeleteConfirmation.open(id, card);
      },
      config,
    },
    myUser._id
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const popupDeleteConfirmation = new PopupWithConfirmation({
  popupSelector: ".delete-confirmation-popup",
  handleFormSubmit: (evt, id, card) => {
    evt.preventDefault();
    api
      .deleteCardFromCloud(id)
      .then(() => popupDeleteConfirmation.close())
      .then(() => card.removeFromDom())
      .catch((err) => console.log(err));
  },
});
popupDeleteConfirmation.setEventListeners();

const names = new UserInfo({
  userNameSelector: ".profile__title",
  jobDescriptionSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const popupEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: (evt, popupInputValues) => {
    evt.preventDefault();
    popupEdit.renameButton("Сохранение...");
    api
      .setUserInfo(popupInputValues.name, popupInputValues.description)
      .then((res) => names.setUserInfo(res))
      .then(() => popupEdit.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupEdit.renameButton("Сохранить"));
  },
});
popupEdit.setEventListeners();

popupOpenButtonElementForEdit.addEventListener("click", () => {
  profileValidation.resetValidation();
  const user = names.getUserInfo();
  nameField.value = user.name;
  jobField.value = user.about;
  popupEdit.open();
});

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleFormSubmit: (evt, popupInputValues) => {
    evt.preventDefault();
    popupAvatar.renameButton("Сохранение...");
    api
      .setNewAvatar(popupInputValues.link)
      .then((res) => (profile__avatar.src = res.avatar))
      .then(() => popupAvatar.close())    
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAvatar.renameButton("Сохранить"));
  },
});
popupAvatar.setEventListeners();

popupOpenButtonElementForAvatar.addEventListener("click", () => {
  avatarValidation.resetValidation();
  popupAvatar.open();
});

// Включение валидации
const formEditProfile = document.querySelector(".popup__form-edit");
const formAddCard = document.querySelector(".popup__form-add");
const formAvatar = document.querySelector(".popup__form-avatar");
const profileValidation = new FormValidator(config, formEditProfile);
const newCardValidation = new FormValidator(config, formAddCard);
const avatarValidation = new FormValidator(config, formAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();