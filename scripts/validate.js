// Объявление объекта, используемого в качестве конфига
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled'
}

// Функции, отображающие ошибку в валидации
const showInputError = (input, formError, errorMessage, inputErrorClass, errorClass) => {
  input.classList.add(inputErrorClass);
  formError.classList.add(errorClass);
  formError.textContent = errorMessage;
};
const hideInputError = (input, formError, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

// Функция, проверяющая валидность инпута
const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  const formError = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, formError, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(input, formError, inputErrorClass, errorClass);
  }
}

// Функции присваивания активности кнопке
const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}
const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

// Функция проверки валидных инпутов для кнопки submit
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {return !input.validity.valid;});
}

// Функиция обработки кнопки submit и ее активного состояния
const toggleButtonState = (submitButton, inputList, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

// Функция, которая добавляет слушатели сабмиту и инпутам с функциями внутри (например проверить инпунт на валидность)
const setEventListeners = (form, inputList, inputErrorClass, errorClass, inactiveButtonClass, submitButton) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  toggleButtonState(submitButton, inputList, inactiveButtonClass);
  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(submitButton, inputList, inactiveButtonClass);
    });
  });
}

// Главная функция, которая собирает данные из верстки
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    setEventListeners(form, inputList, config.inputErrorClass, config.errorClass, config.inactiveButtonClass, submitButton);
  });
}

enableValidation (selectors);

// Функция сброса ошибки

const resetForm = (popup, config) => {
  const formElement = popup.querySelector(config.formSelector);
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((input) => {
    const formError = formElement.querySelector(`.${input.id}-error`);
    hideInputError(input, formError, config.inputErrorClass, config.errorClass);
  });
}
const setDefaultButton = (popup, config) => {
  const formElement = popup.querySelector(config.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = popup.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButton, inputList, config.inactiveButtonClass);
}