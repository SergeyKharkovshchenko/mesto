
export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.popup_field));
        this.checkInputValidity = this.checkInputValidity.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);
    }

    enableValidation = () => {
        this.setEventListeners();
    }

    setEventListeners = () => {
        // чтобы проверить состояние кнопки в самом начале
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this.checkInputValidity(inputElement));
            // чтобы проверять его при изменении любого из полей
            inputElement.addEventListener('input', () => this.toggleButtonState());
        });
    }

    checkInputValidity = (inputElement) => {
        // setErrorText(inputElement);
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    };

    showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
        inputElement.classList.add(this._settings.errorClass);
    };

    hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._settings.errorClass);
    };

    toggleButtonState = () => {
        const buttonElement = this._formElement.querySelector(this._settings.submit_button);
        if (this.hasInvalidInput()) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._settings.button_invalid);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._settings.button_invalid);
        }
    }

    hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    resetValidation() {
        // управляем кнопкой  
        this.toggleButtonState(); 
        //очищаем ошибки 
        this._inputList.forEach((inputElement) => {
          this.hideInputError(inputElement) 
        });
      }
  
}




// function setErrorText(input) {
//     const validity = input.validity;
//     input.setCustomValidity('');
//     if (validity.valueMissing) {
//         input.setCustomValidity('Поле пустое');
//     }
//     if (validity.tooLong) {
//         input.setCustomValidity('Много символов');
//     }
//     if (validity.tooShort) {
//         input.setCustomValidity('Мало символов');
//     }
//     if (validity.typeMismatch && input.type === 'url') {
//         input.setCustomValidity('Введите ссылку');
//     }
// }

