const showInputError = (formElements, inputElement, errorMessage, config) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);

  formElements.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElements, inputElement, config) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);

  formElements.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = " ";
};

const isValid = (formElements, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElements, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElements, inputElement, config);
  }
};

const setEventListeners = (formElements, config) => {
  const inputList = Array.from(
    formElements.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElements.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElements, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElements) => {
    formElements.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElements, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: ".popup__text_type_error",
  errorClass: ".popup__text-error_active"
});
