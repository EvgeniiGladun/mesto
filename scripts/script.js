// Денамические карточки.
const initialCards = [

    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Подключенные переменные.
const buttonEditPopup = document.querySelector('.profile__edit-button');
const buttonEditPopupClose = document.querySelector('.popup__close');
const editPopup = document.querySelector('.popup');
const formEditProfile = document.querySelector('.popup__form');
const buttonAddPopup = document.querySelector('.profile__add-button');
const buttonAddPopupSubmit = document.querySelector('.popup-add__save');
const buttonAddPopupClose = document.querySelector('.popup-add__close');
const popupAddCard = document.querySelector('.popup-add');
const formAddCardsElement = document.querySelector('.popup__form-card');


const inputUserName = document.querySelector('.popup__text_user_name');
const inputUserSpecialty = document.querySelector('.popup__text_user_specialty');
const profileName = document.querySelector('.profile__name');
const profileSpecialty = document.querySelector('.profile__specialty');


const initialCardsList = document.querySelector('.cards');
const templateElements = document.querySelector('.template');
const cardsElements = document.querySelector('.cards__card');
const inputLinkElements = document.querySelector('.popup__text-link');
const inputTitleElements = document.querySelector('.popup__text-title');


const cardImgPopup = document.querySelector('.popup-img');
const cardTitleImage = document.querySelector('.popup__title_img');
const cardCloseImg = document.querySelector('.popup-img__close');
const fullImgFoto = document.querySelector('.popup__img');
const popupActive = document.querySelector('.popup_opened');


// Модальное окно открытие
// и закрытие через "esc"
function openPopup(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKeyEsc);
}

// Модальное окно закрытие
function closePopup(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKeyEsc);
}

// Функция для закрытие через кнопку - "esc"
const closePopupKeyEsc = (evt) => {
    if (evt.key == 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
}

// Функция для закрытие через клик по фону - "overlay"
const handlerOverley = (evt) => {
    if (!evt.target.closest('.popup__container')) {
            closePopup(evt.target.closest('.popup'));
        }
    }

// Отправление формы "новое место" 
function submitAddCardForm(evt) {
    evt.preventDefault();
    const inputTextLink = inputLinkElements.value;
    const inputTextTitle = inputTitleElements.value;
    const data = {
        name: inputTextTitle,
        link: inputTextLink
    }
    const newItem = composeItem(data);
    initialCardsList.prepend(newItem);
    formAddCardsElement.reset();
    disableSubmitButton(buttonAddPopupSubmit);
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
    const listItemCard = initialCards.map(composeItem);

    initialCardsList.append(...listItemCard);
}

// Создание карточки после отправки формы от "новое место"
function composeItem(item) {
    const newItem = templateElements.content.cloneNode(true);
    const headerElemets = newItem.querySelector('.cards__title');
    const linkElemets = newItem.querySelector('.cards__image');
    headerElemets.textContent = item.name;
    linkElemets.alt = item.name;
    linkElemets.setAttribute('src', item.link, item.name);
    newItem.querySelector('.cards__rectangle-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__rectangle-like_active');
    });

// Карзина для удаления карточки с сайта 
    const removeButton = newItem.querySelector('.cards__rectangle-remove');
    removeButton.addEventListener('click', removeItem);

    linkElemets.addEventListener('click', () => {
        openCardImage(item.name, item.link)
    });

    return newItem;
}

// Удаление карточки с сайта
function removeItem(event) {
    event.target.closest('.cards__card').remove()
}

// Открытие popup картинки на весь экран
function openCardImage(name, link) {
    cardTitleImage.textContent = name;
    fullImgFoto.src = link;
    fullImgFoto.alt = name;

    openPopup(cardImgPopup);
}

// Модальное окно 'редактирование профиля'
buttonEditPopup.addEventListener('click', function () {
    inputUserName.value = profileName.textContent;
    inputUserSpecialty.value = profileSpecialty.textContent;
    openPopup(editPopup);
});

// Закрытие popup "редактировать прфоиль" нажатием на крестик
buttonEditPopupClose.addEventListener('click', function () {
    closePopup(editPopup);
});

//  Сохранение формы "редактирование профиля"
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Модальное окно 'Добавление места'
buttonAddPopup.addEventListener('click', function () {
    formAddCardsElement.reset();
    openPopup(popupAddCard);
});

// Закрытие popup "новое место" нажатием на крестик
buttonAddPopupClose.addEventListener('click', function () {
    closePopup(popupAddCard);
});

// Закрытие popup "картинка" нажатием на крестик
cardCloseImg.addEventListener('click', function () {
    closePopup(cardImgPopup);
});

formAddCardsElement.addEventListener('submit', submitAddCardForm);

editPopup.addEventListener('click', handlerOverley);

popupAddCard.addEventListener('click', handlerOverley);

cardImgPopup.addEventListener('click', handlerOverley);

renderList();