const config = {
    popup_form: '.popup__container',
    submit_button: '.popup__submit-button',
    button_valid: 'popup__submit-button_activity_valid',
    button_invalid: 'popup__submit-button_activity_invalid'
}


const setEventListeners = (formElement, settings) => {
    formElement.addEventListener('input', (event) => handleFormInput(event, formElement, settings));
};



const enableValidation = (settings) => {
    const form = Array.from(document.querySelectorAll(settings.popup_form));
    form.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

enableValidation(config);

function handleFormInput(event, formElement, settings) {
    const input = event.target;
    setErrorText(input);
    showError(input);
    setSubmitButtonStatus(event, formElement, settings);

}

function handleFormSubmit(event, formElement, settings) {
    event.preventDefault();
    const form = event.target;
    const isValid = form.checkValidity();
    if (isValid) {
        form.reset();
    } else {
        setSubmitButtonStatus(event, formElement, settings);
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




function setSubmitButtonStatus(event, formElement, settings) {
    const button = event.currentTarget.querySelector(settings.submit_button);
    const isValid = formElement.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(settings.button_invalid);
        button.classList.add(settings.button_valid);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(settings.button_invalid);
        button.classList.remove(settings.button_valid);
    }
}