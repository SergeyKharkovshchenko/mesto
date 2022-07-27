const config = {
    popup_form: '.popup__container',
    submit_button: '.popup__submit-button',
    button_valid: 'popup__submit-button_activity_valid',
    button_invalid: 'popup__submit-button_activity_invalid'
}


const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (event) => handleFormSubmit(event, formElement));
    formElement.addEventListener('input', (event) => handleFormInput(event, formElement));
    formElement.addEventListener('url', (event) => handleFormInput(event, formElement));
};



const enableValidation = (settings) => {
    const form = Array.from(document.querySelectorAll(settings.popup_form));
    form.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

enableValidation(config);

function handleFormInput(event, formElement) {
    const input = event.target;
    setErrorText(input);
    showError(input);
    setSubmitButtonStatus(event, formElement);

}

function handleFormSubmit(event, formElement) {
    event.preventDefault();
    const form = event.target;
    const isValid = form.checkValidity();
    if (isValid) {
        form.reset();
    } else {
        setSubmitButtonStatus(event, formElement);
    }
}



function showError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
}




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




function setSubmitButtonStatus(event, formElement) {
    const button = event.currentTarget.querySelector(config.submit_button);
    const isValid = formElement.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(config.button_invalid);
        button.classList.add(config.button_valid);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(config.button_invalid);
        button.classList.remove(config.button_valid);
    }
}