export default class FormValidator {
  constructor(
    {
      formSelector,
      inputElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElement
  ) {
    (this._formSelector = formSelector),
      (this._formElement = formElement),
      (this._inputSelector = inputElement),
      (this._inputSelector = inputSelector),
      (this._submitButtonSelector = submitButtonSelector),
      (this._inactiveButtonClass = inactiveButtonClass),
      (this._inputErrorClass = inputErrorClass),
      (this._errorClass = errorClass);
  }

  // Ищем невалидные инпуты, с помощью метода 'some'
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // Кнопка с валидацией
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Перебераем 'inputSelector' и присваевыем каждому 'инпуту'
  // постоянную проверку на волидность
  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._isValid(item);
        this._toggleButtonState();
      });
    });
  }

  // Показываем ошибку в 'инпуте'
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  // Скрываем ошибку из 'инпута'
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  // Если поля не валидны, ошибки показываются
  // Или на оборот, скрываются
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  // Включение валидации
  enableValidation() {
    this._setEventListeners();
  }

  // Перезапуск форм и кнопок
  resetValidation() {
    this._formElement.reset();
    this._toggleButtonState();
  }
}
