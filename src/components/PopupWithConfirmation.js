import {
    Popup
} from './Popup.js';

export default class PopupWithConfirmation extends Popup {

    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__container');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            this._handleFormSubmit(e, this._id, this._element, this._card);
        });
    }

    close() {
        super.close();
    }

    open (id, element, card) {
        super.open();
        this._id = id;
        this._element = element;
        this._card = card;
    }
    
}