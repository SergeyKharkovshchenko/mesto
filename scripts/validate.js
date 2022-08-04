const config = {
    // formSelector: '.popup__form',
    popup_set: '.popup__set',
    // inputSelector: '.popup__input',
    popup_field: '.popup__field',
    // submitButtonSelector: '.popup__button',
    submit_button: '.popup__submit-button',
    // inactiveButtonClass: 'popup__button_disabled',
    button_invalid: 'popup__submit-button_activity_invalid',
    // inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',   
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
    inputElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(settings.errorClass);

};


const checkInputValidity = (formElement, inputElement, settings) => {
    // setErrorText(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};


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



const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(settings.button_invalid);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(settings.button_invalid);
    }
}




const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.popup_field));
    const buttonElement = formElement.querySelector(settings.submit_button);
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.popup_set));
    formList.forEach((formElement) => {
            setEventListeners(formElement, settings);
    });
};

enableValidation(config);


