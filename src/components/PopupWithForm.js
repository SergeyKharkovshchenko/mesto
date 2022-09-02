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
        this._form = this._popup.querySelector('.popup__container');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
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

    
}