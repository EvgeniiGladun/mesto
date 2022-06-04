import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  initialCards,
  allCardsList,
  cardsContainer,
  buttonEditPopup,
  buttonAddPopup,
  formEditProfile,
  formAddCardsElement,
} from '../utils/constants.js'

const handleCardClick = (name, link) => {
  openPopupImg.open(name, link);
}

const openPopupImg = new PopupWithImage('.popup-img');
const popupAddCards = new Popup('.popup-add');
const popupEditCards = new Popup('.popup-edit');

const profileUserInfo = new UserInfo({ userName: '.profile__name', userSpecialty: '.profile__specialty' });

// Отправление формы 'новое место'
const formAddCards = new PopupWithForm(
  '.popup-add',
  {
    handleFormSubmit: (inputValues) => {

      const addCardsList = new Card(
        inputValues,
        '.template',
        handleCardClick,
      )

      const cardElement = addCardsList.generateCard();

      allCardsList.prepend(cardElement);
      formValidatorsAdd.reset();
      popupAddCards.close();
    }
  });
formAddCards.setEventListeners();


// Модальное окно 'редактирование профиля и отправка'
const formEditCards = new PopupWithForm(
  '.popup-edit',
  {
    handleFormSubmit: (inputValues) => {
      profileUserInfo.setUserInfo(inputValues.name, inputValues.specialty);

      formValidatorEdit.reset();
      popupEditCards.close();
    }
  });
formEditCards.setEventListeners();


// Функция гинераций карточек
const renderListCards = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item,
      '.template',
      handleCardClick,
    );
    const cardElement = card.generateCard();

    renderListCards.addItem(cardElement);
  }
},
  cardsContainer
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
  
  const setData = {
    name: document.querySelector('.popup__text_user_name'),
    specialty: document.querySelector('.popup__text_user_specialty'),
  }

  setData.name.value = userInfo.name;
  setData.specialty.value = userInfo.specialty;

  popupEditCards.open();
});

// Модальное окно 'Добавление места'
buttonAddPopup.addEventListener('click', () => {
  formAddCardsElement.reset();
  formValidatorsAdd.reset();
  popupAddCards.open();
});

// Закрытие Popup нажатием на крестик / overley
const popupEditCardsClose = new Popup('.popup-edit');
popupEditCardsClose.setEventListeners();
const popupImgCardsClose = new Popup('.popup-img');
popupImgCardsClose.setEventListeners();



// Рендер карточек на сайт из массива
renderListCards.renderItems();