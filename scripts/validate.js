const config = {
    popup_form: '.popup__container',
    popup_set: '.popup__set',
    popup_field: '.popup__field',
    submit_button: '.popup__submit-button',
    button_invalid: 'popup__submit-button_activity_invalid'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
    setErrorText(inputElement);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};


function setErrorText(input) {
    const validity = input.validity;
    input.setCustomValidity('');
    if (validity.valueMissing) {
        input.setCustomValidity('Поле пустое');
    }
    if (validity.tooLong) {
        input.setCustomValidity('Много символов');
    }
    if (validity.tooShort) {
        input.setCustomValidity('Мало символов');
    }
    if (validity.typeMismatch && input.type === 'url') {
        input.setCustomValidity('Введите ссылку');
    }
}



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
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.popup_form));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(settings.popup_set)); //
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, settings);
        });
    });
};

enableValidation(config);