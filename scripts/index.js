const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const nameInput  = document.querySelector('.popup__field_type_name');
const jobInput  = document.querySelector('.popup__field_type_job');
const formElement = document.querySelector('.popup__submit-button');



const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
    nameInput.value = "";
    jobInput.value = "";
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    if (nameInput.value!="") {
        nameElement.textContent = nameInput.value;
    }
    if (jobInput.value!="") {
        jobElement.textContent = jobInput.value;
    }
    popupElement.classList.remove('popup_is-opened');
}



popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('click', formSubmitHandler);
