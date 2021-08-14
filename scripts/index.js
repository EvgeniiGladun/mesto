import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Объекты в переменной
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
};

// Денамические карточки.
const initialCards = [
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
const allCardsList = document.querySelector('.cards');

const buttonEditPopup = document.querySelector('.profile__edit-button');
const buttonAddPopup = document.querySelector('.profile__add-button');
const buttonEditPopupClose = document.querySelector('.popup-edit__close');
const popupCloseImg = document.querySelector('.popup-img__close');
const buttonAddPopupClose = document.querySelector('.popup-add__close');
const editPopup = document.querySelector('.popup');
const formEditProfile = document.querySelector('.popup__form');
const popupAddCard = document.querySelector('.popup-add');
const formAddCardsElement = document.querySelector('.popup__form-card');

const profileName = document.querySelector('.profile__name');
const inputUserName = document.querySelector('.popup__text_user_name');
const profileSpecialty = document.querySelector('.profile__specialty');
const inputUserSpecialty = document.querySelector(
  '.popup__text_user_specialty'
);

const inputLinkElement = document.querySelector('.popup__text-link');
const inputTitleElement = document.querySelector('.popup__text-title');

export const cardImgPopup = document.querySelector('.popup-img');

// Модальное окно открытие
// и закрытие через 'esc'
export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEsc);
}

// Модальное окно закрытие
function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEsc);
}

// Функция для закрытие через кнопку - 'esc'
const closePopupKeyEsc = (evt) => {
  if (evt.key == 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функция для закрытие через клик по фону - 'overlay'
const handlerOverley = (evt) => {
  if (!evt.target.closest('.popup__container')) {
    closePopup(evt.target.closest('.popup'));
  }
};

const generateCardItem = (data, templateSelector) => {
  const card = new Card(data, templateSelector);
  return card.generateCard();
};

// Отправление формы 'новое место'
function submitAddCardForm(evt) {
  evt.preventDefault();
  const inputTextLink = inputLinkElement.value;
  const inputTextTitle = inputTitleElement.value;
  const data = {
    name: inputTextTitle,
    link: inputTextLink,
  };
  allCardsList.prepend(generateCardItem(data, '.template'));
  formValidatorsAdd.reset();
  closePopup(popupAddCard);
}

// Модальное окно 'редактирование профиля и отправка'
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileSpecialty.textContent = inputUserSpecialty.value;
  closePopup(editPopup);
}

// Функция гинераций карточек
function renderList() {
  initialCards.forEach((data) => {
    allCardsList.append(generateCardItem(data, '.template'));
  });
}

// Форма валидации 'новое место'
const formValidatorsAdd = new FormValidator(
  validationConfig,
  formAddCardsElement
);
formValidatorsAdd.enableValidation();

// Форма валидации 'Редактировать профиль'
const formValidatorEdit = new FormValidator(validationConfig, formEditProfile);
formValidatorEdit.enableValidation();

// Модальное окно 'редактирование профиля'
buttonEditPopup.addEventListener('click', function () {
  inputUserName.value = profileName.textContent;
  inputUserSpecialty.value = profileSpecialty.textContent;
  openPopup(editPopup);
});

// Закрытие popup 'редактировать профиль' нажатием на крестик
buttonEditPopupClose.addEventListener('click', function () {
  closePopup(editPopup);
});

//  Сохранение формы 'редактирование профиля'
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Модальное окно 'Добавление места'
buttonAddPopup.addEventListener('click', function () {
  formAddCardsElement.reset();
  formValidatorsAdd.reset();
  openPopup(popupAddCard);
});

// Закрытие popup 'новое место' нажатием на крестик
buttonAddPopupClose.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// Закрытие popup 'картинка' нажатием на крестик
popupCloseImg.addEventListener('click', function () {
  closePopup(cardImgPopup);
});

formAddCardsElement.addEventListener('submit', submitAddCardForm);

editPopup.addEventListener('click', handlerOverley);

popupAddCard.addEventListener('click', handlerOverley);

cardImgPopup.addEventListener('click', handlerOverley);

renderList();
