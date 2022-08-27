import UserInfo from "./UserInfo.js";


const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');


export class Popup{

    constructor(popupSelector){
        this._popupSelector = popupSelector;
    }

    closePopup () {
        this._popupSelector.classList.remove('popup_opened');
    }

    openPopup (){
        this._popupSelector.querySelectorAll('.popup__field').forEach((input) => {
            input.classList.remove('popup__error_visible');
        });    

        this._popupSelector.querySelectorAll('.popup__error').forEach((input) => {
        input.textContent='';
        });    

        this._popupSelector.classList.add('popup_opened');
        const names = new UserInfo(nameElement.textContent, jobElement.textContent);
        names.getUserInfo();
    }

    _handleEscClose(evt){
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }

    setEventListeners(){
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
            });
        document.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.closePopup();
                }
            });
        document.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
                this.closePopup();
                }
            });        
    }

}







