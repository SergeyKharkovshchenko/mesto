import {
    Popup
} from './Popup.js';

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
    _likeButton: '.element__heart',
    thrashbin: '.element__thrashbin'
}

export default class PopupWithForm extends Popup {

    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputs = this._popup.querySelectorAll(config.popup_field);
        this._submitButton = this._popup.querySelector(config.submit_button);
    }

    _getInputValues() {
        this._popupInputValues = {};
        this._inputs.forEach((input) => {
            this._popupInputValues[input.name] = input.value;
        });
        return this._popupInputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (e) => {
            this._handleFormSubmit(e, this._getInputValues());
            this.close(e);
        });
    }

    close() {
        this._inputs.forEach((input) => {
            input.reset;
            input.classList.remove(config.errorClass);
        });
        this._submitButton.setAttribute('disabled', true);
        this._submitButton.classList.add(config.button_invalid);
        super.close();
    }

    open(name, job) {
        this._popup.querySelector('.popup__field-for-name').value = name;
        this._popup.querySelector('.popup__field-for-job').value = job;
        super.open();
    }
}