import {
    Popup
} from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupTitleElementForImage = this._popup.querySelector('.image-popup__title');
        this._popupFotoElementForImage = this._popup.querySelector('.image-popup__foto');

    }
    open(data) {
        this._popupFotoElementForImage.src = data.link;
        this._popupTitleElementForImage.textContent = data.name;
        this._popupFotoElementForImage.alt = data.name;
        super.open();
    }
}