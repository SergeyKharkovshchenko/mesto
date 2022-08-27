import {Popup} from './Popup.js';
import {config} from './index.js';


export default class PopupWithForm extends Popup{

    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        }

    _getInputValues(){
        this._popupInputValues = {};
        this._popupSelector.querySelectorAll(config.popup_field).forEach((input) => {
            this._popupInputValues[input.name] = input.value;
        });
        return this._popupInputValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (e) => {
            this._handleFormSubmit(e, this._getInputValues());
            this.closePopup(e);
            });
    }

    closePopup(){
        this._popupSelector.querySelectorAll(config.popup_field).forEach((input) => {
            input.value = '';
        });    
    super.closePopup();
    }

}
