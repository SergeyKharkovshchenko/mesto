import {
    Popup
} from './Popup.js';

export default class PopupWithForm extends Popup {

    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputs = this._popup.querySelectorAll('.popup__field');
        this._errorfields = this._popup.querySelectorAll('.popup__error');
        this._form = this._popup.querySelector('.popup__container');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._button_invalid = 'popup__submit-button_activity_invalid';
        this._errorClass = 'popup__error_visible';
        this._nameField = this._popup.querySelector('.popup__field-for-name');
        this._jobField = this._popup.querySelector('.popup__field-for-job');
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
        this._form.addEventListener('submit', (e) => {
            this._handleFormSubmit(e, this._getInputValues());
            this.close();
        });
    }

    close() {
        this._form.reset();
        super.close();
    }

    open() {
        super.open();
    }

    insertData({
        name,
        description
    }) {
        this._nameField.value = name;
        this._jobField.value = description;
    }
}