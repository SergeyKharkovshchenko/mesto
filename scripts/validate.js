function handleFormInput(event) {
    const input = event.target;
    const form = event.currentTarget;
    setErrorText(input);
    showError(input);
    setSubmitButtonStatus(form);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    if (isValid) {
        form.reset();
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




function setSubmitButtonStatus(form) {
    const button = form.querySelector('.popup__submit-button');
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove('popup__button_invalid');
        button.classList.add('popup__button_valid');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('popup__button_invalid');
        button.classList.remove('popup__button_valid');
    }
}



function enableValidation(formAdd) {
    formAdd.addEventListener('submit', handleFormSubmit);
    formAdd.addEventListener('input', (event) => handleFormInput(event));
    formAdd.addEventListener('url', (event) => handleFormInput(event));
}


enableValidation(document.querySelector('.popup__form-add'));
enableValidation(document.querySelector('.popup__form-edit'));