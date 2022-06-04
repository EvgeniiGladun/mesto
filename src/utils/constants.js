// Объекты в переменной
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
};

// Денамические карточки.
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Подключенные переменные.
export const allCardsList = document.querySelector('.cards');
export const cardsContainer = document.querySelector('.template');
export const buttonEditPopup = document.querySelector('.profile__edit-button');
export const buttonAddPopup = document.querySelector('.profile__add-button');
export const popupCloseImg = document.querySelector('.popup-img__close');
export const formEditProfile = document.querySelector('.popup__form');
export const formAddCardsElement = document.querySelector('.popup__form-card');

export const cardImgPopup = document.querySelector('.popup-img');