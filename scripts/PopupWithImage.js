import {Popup} from './Popup.js'

const popupElementForImage = document.querySelector('.image-popup');
const popupTitleElementForImage = document.querySelector('.image-popup__title');
const popupFotoElementForImage = document.querySelector('.image-popup__foto');

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    openPopup (name, link){    
            popupFotoElementForImage.src = link;
            popupTitleElementForImage.textContent = name;
            popupFotoElementForImage.alt = name;
            popupElementForImage.classList.add('popup_opened');
    }
}