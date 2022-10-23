// Объекты в переменной
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
};

// Подключенные переменные.

export const buttonEditPopup = document.querySelector('.profile__edit-button');
export const buttonAddPopup = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar-edit');

export const formPages = document.querySelector('.popup__form');
export const formEditProfile = document.querySelector('.popup__form-edit');
export const formAddCardsElement = document.querySelector('.popup__form-card');
export const formEditUserAvatar = document.querySelector('.popup__form-avatar');

export const popupCloseImg = document.querySelector('.popup-img__close');