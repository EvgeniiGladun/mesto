import '../pages/index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  buttonEditPopup,
  buttonAddPopup,
  buttonEditAvatar,
  formEditProfile,
  formAddCardsElement,
  formEditUserAvatar,
} from '../utils/constants.js'

// Делаем запрос по api для получения информации
const api = new Api({

  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'b196677a-3080-4bcc-9e6b-17cac3a4c3c9',
    'Content-Type': 'application/json'
  },
});

// Объект секций карточек
const renderListCards = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    renderListCards.addItem(cardElement);
  }
},
  '.card');

// Пременные для карточек и пользователей
let idUser = null;

// Запрос pull карточек для генераций
// Запрос и вставка информаций пользователя
Promise.all([
  api.getInitialCards(),
  api.getInitialUsers(),
])
  .then(([cards, infoUsers]) => {

    // Присвоение id user
    idUser = infoUsers._id;
    // Рендер карточек на сайт из массива
    renderListCards.renderItems(cards);
    // Поулчение данных user
    profileUserInfo.setUserInfo(infoUsers.name, infoUsers.about, infoUsers.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })

// Открытие картинки карточки на весь экран
const imagePopup = new PopupWithImage('.popup-img');
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

// Окно "предупреждение" удаления карточки
const warningPopup = new PopupWithConfirmation(
  '.popup-warning',
);


// Ставим лайк карточке
const toPutLike = (id, card) => {

  api.pushLike(id)
    .then((like) => {
      card.likeItem(like.likes);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
}

// Удаляем лайк с карточки
const deleteLike = (id, card) => {

  api.deleteLike(id)
    .then((delLike) => {
      card.likeItem(delLike.likes);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
}

// Класс данных пользователя
const profileUserInfo = new UserInfo({ userName: '.profile__name', userSpecialty: '.profile__specialty', userAvatar: '.profile__avatar' });

// Класс создание карточки
const createCard = (data) => {
  const сard = new Card(
    data,
    '.template',
    handleCardClick,
    // Всплывающее окно "удаление" карточки
    {
      handleCardDelete: (mapInfoСard, idCard) => {
        warningPopup.open();

        warningPopup.setSomeMethod(() => {
          {
            warningPopup.changingTextLoading('Удаление...')
            api.deleteCard(idCard)
              .then(() => {

                mapInfoСard.removeItem()
                warningPopup.close();
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })
              .finally(() => { warningPopup.changingTextLoading('Да') });
          }
        })
      }
    },
    idUser,
    toPutLike,
    deleteLike
  );

  const cardElement = сard.generateCard();

  return cardElement;
}



// Отправление формы 'новое место'
const formAddCards = new PopupWithForm(
  '.popup-add',
  {
    handleFormSubmit: (inputCardsValues) => {
      formAddCards.changingTextLoading('Сохранение...');
      api.setAddNewCard(inputCardsValues.name, inputCardsValues.link)
        .then((data) => {

          const cardElement = createCard(data);
          renderListCards.prependItem(cardElement);
          formAddCards.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => { formAddCards.changingTextLoading('Создать') });
    }
  });

// Отправление формы 'новая аватарка'
const formEditAvatar = new PopupWithForm(
  '.popup-avatar',
  {
    handleFormSubmit: (inputAvatarValues) => {
      formEditAvatar.changingTextLoading('Сохранение...');
      api.setNewAvatar(inputAvatarValues.link)
        .then((data) => {

          profileUserInfo.setUserInfo(data.name, data.about, data.avatar)
          formEditAvatar.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => { formEditAvatar.changingTextLoading('Сохранить') });
    }
  });

// Модальное окно 'редактирование профиля и отправка'
const formEditCardProfil = new PopupWithForm(
  '.popup-edit',
  {
    handleFormSubmit: (inputProfilValues) => {

      formEditCardProfil.changingTextLoading('Сохранение...');
      api.setInitialUsers(inputProfilValues.name, inputProfilValues.specialty)
        .then((data) => {
          profileUserInfo.setUserInfo(data.name, data.about);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => { formEditCardProfil.changingTextLoading('Сохранить') });

      formEditCardProfil.close();
    }
  });


// Форма валидации 'новое место'
const formValidatorsAdd = new FormValidator(
  validationConfig,
  formAddCardsElement
);
formValidatorsAdd.enableValidation();

// Форма валидации 'Редактировать профиль'
const formValidatorEdit = new FormValidator(
  validationConfig,
  formEditProfile
);
formValidatorEdit.enableValidation();

// Форма валидации 'новый аватар'
const formValidatorsAvatar = new FormValidator(
  validationConfig,
  formEditUserAvatar
);
formValidatorsAvatar.enableValidation();

// Модальное окно 'редактирование профиля'
buttonEditPopup.addEventListener('click', () => {
  const userInfo = profileUserInfo.getUserInfo();
  formEditCardProfil.setInputValues(userInfo);
  formValidatorEdit.resetValidation();

  formEditCardProfil.open();
});

// Модальное окно 'Добавление места'
buttonAddPopup.addEventListener('click', () => {
  formValidatorsAdd.resetValidation();

  formAddCards.open();
});

buttonEditAvatar.addEventListener('click', () => {
  formValidatorsAvatar.resetValidation();

  formEditAvatar.open();
})

// Вызов "навешивания" на Popup
imagePopup.setEventListeners();
formAddCards.setEventListeners();
formEditCardProfil.setEventListeners();
warningPopup.setEventListeners();
formEditAvatar.setEventListeners();