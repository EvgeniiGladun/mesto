// "Серим кнопку" отключение кнопки
const disableSubmitButton = (buttonAddPopupSubmit) => {
  buttonAddPopupSubmit.classList.add(validationConfig.inactiveButtonClass);
  buttonAddPopupSubmit.disabled = true;
}

// Показываем ошибку в "инпуте" 
const showInputError = (formElements, inputElement, errorMessage, config) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Скрываем ошибку из "инпута"
const hideInputError = (formElements, inputElement, config) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ' ';
};

// Если поля не валидны, ошибки показываются
// Или на оборот, скрываются
const isValid = (formElements, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElements, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElements, inputElement, config);
  }
};

// Перебераем "inputSelector" и присваевыем каждому "инпуту"
// постоянную проверку на волидность
const setEventListeners = (formElements, config) => {
  const inputList = Array.from(
    formElements.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElements.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElements, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Перебераем "formSelector" и присваевыем каждому "сабмиту"
// отправление форм, без обновления страницы
// так же вызываем функцию "setEventListeners" с аргументами
// formElements и config
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElements) => {
    formElements.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElements, config);
  });
};

// Ищем невалидные инпуты, с помощью метода "some"
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Кнопка с валидацией
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Объекты в переменной
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};

enableValidation(validationConfig);