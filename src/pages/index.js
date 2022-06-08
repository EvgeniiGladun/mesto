import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  initialCards,
  buttonEditPopup,
  buttonAddPopup,
  formEditProfile,
  formAddCardsElement,
} from '../utils/constants.js'

const imagePopup = new PopupWithImage('.popup-img');
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

const profileUserInfo = new UserInfo({ userName: '.profile__name', userSpecialty: '.profile__specialty' });


const createCard = (inputValues) => {
  const addCardsList = new Card(
    inputValues,
    '.template',
    handleCardClick,
  );

  const cardElement = addCardsList.generateCard();

  return cardElement;
}

// Отправление формы 'новое место'
const formAddCards = new PopupWithForm(
  '.popup-add',
  {
    handleFormSubmit: (inputCardsValues) => {
      const cardElement = createCard(inputCardsValues);
      renderListCards.prependItem(cardElement);

      formAddCards.close();
    }
  });

// Модальное окно 'редактирование профиля и отправка'
const formEditCards = new PopupWithForm(
  '.popup-edit',
  {
    handleFormSubmit: (inputProfilValues) => {
      profileUserInfo.setUserInfo(inputProfilValues.name, inputProfilValues.specialty);

      formEditCards.close();
    }
  });

// Функция гинераций карточек
const renderListCards = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    renderListCards.addItem(cardElement);
  }
},
  '.cards'
);

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
buttonEditPopup.addEventListener('click', () => {
  const userInfo = profileUserInfo.getUserInfo();
  formEditCards.setData(userInfo);

  formEditCards.open();
});

// Модальное окно 'Добавление места'
buttonAddPopup.addEventListener('click', () => {
  formValidatorsAdd.resetValidation();

  formAddCards.open();
});

// Вызов "навешивания" на Popup
imagePopup.setEventListeners();
formAddCards.setEventListeners();
formEditCards.setEventListeners();


// Рендер карточек на сайт из массива
renderListCards.renderItems();