import {
    Popup
} from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupTitleElementForImage = this._popup.querySelector('.image-popup__title');
        this._popupFotoElementForImage = this._popup.querySelector('.image-popup__foto');

    }
    open(name, link) {
        this._popupFotoElementForImage.src = link;
        this._popupTitleElementForImage.textContent = name;
        this._popupFotoElementForImage.alt = name;
        super.open();
    }
}