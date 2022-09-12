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
            this._handleFormSubmit(e, this.id, this._element);
            this.close();
        });
    }

    close() {
        this._form.reset();
        super.close();
    }

    open (id, _element) {
        super.open();
        this.id = id;
        this._element = _element;
    }
    
}