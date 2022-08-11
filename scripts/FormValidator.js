
export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this.checkInputValidity = this.checkInputValidity.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);
    }

    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.popup_field));
        const buttonElement = this._formElement.querySelector(this._settings.submit_button);
        // чтобы проверить состояние кнопки в самом начале
        this.toggleButtonState(inputList, buttonElement, this._settings);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this.checkInputValidity(this._formElement, inputElement, this._settings));
            // чтобы проверять его при изменении любого из полей
            inputElement.addEventListener('input', () => this.toggleButtonState(inputList, buttonElement, this._settings));
        });
    }

    checkInputValidity = (formElement, inputElement, settings) => {
        // setErrorText(inputElement);
        if (!inputElement.validity.valid) {
            this.showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        } else {
            this.hideInputError(formElement, inputElement, settings);
        }
    };

    showInputError = (formElement, inputElement, errorMessage, settings) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
        inputElement.classList.add(settings.errorClass);
    };

    hideInputError = (formElement, inputElement, settings) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(settings.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(settings.errorClass);

    };

    toggleButtonState = (inputList, buttonElement, settings) => {
        if (this.hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(settings.button_invalid);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(settings.button_invalid);
        }
    }

    hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
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

