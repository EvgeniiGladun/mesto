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
let buttonEditPopup = document.querySelector('.profile__edit-button');
let buttonEditPopupClose = document.querySelector('.popup__close');
let editPopup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let buttonAddPopup = document.querySelector('.profile__add-button');
let buttonAddPopupClose = document.querySelector('.popup-add__close');
let addPopup = document.querySelector('.popup-add');
let formAddCardsElement = document.querySelector('.popup__form-card');

let inputUserName = document.querySelector('.popup__text_user_name');
let inputUserSpecialty = document.querySelector('.popup__text_user_specialty');
let profileName = document.querySelector('.profile__name');
let profileSpecialty = document.querySelector('.profile__specialty');

const initialCardsList = document.querySelector('.cards');
const templateElements = document.querySelector('.template');
const cardsElements = document.querySelector('.cards__card');
const inputLinkElements = document.querySelector('.popup__text-link');
const inputTitleElements = document.querySelector('.popup__text-title');
let imgPopup = document.querySelector('.popup-image');
let fullSizeImage = document.querySelector('.popup__title-image');
let fullSizeImageLink = document.querySelector('.popup__image-link');


// Модальное окно 'редактирование профиля'
function openedPopup(modal) {
    modal.classList.add('popup_opened');
}

function closePopup(modal) {
    modal.classList.remove('popup_opened');
}

function formAddSubmitHandler(evt) {
    evt.preventDefault();
    const inputTextLink = inputLinkElements.value;
    const inputTextTitle = inputTitleElements.value;
    let data = {
        name: inputTextTitle,
        link: inputTextLink
    };
    const newItem = composeItem(data);
    initialCardsList.prepend(newItem);
    formAddCardsElement.reset();
    closePopup(addPopup);
}

let imgClick = document.querySelector('.popup__image');

function imgClickAllCard() {

}

// Модальное окно 'редактирование профиля и отправка'
function formSubmitHandler(evt) {
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



function composeItem(item) {
    const newItem = templateElements.content.cloneNode(true);
    const headerElemets = newItem.querySelector('.cards__title');
    const linkElemets = newItem.querySelector('.cards__image');
    headerElemets.textContent = item.name;
    linkElemets.setAttribute('src', item.link);
    newItem.querySelector('.cards__rectangle-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__rectangle-like_active');
    });
    const removeButton = newItem.querySelector('.cards__rectangle-remove');
    removeButton.addEventListener('click', removeItem);
    return newItem;
}

function removeItem(event) {
    const targetElement = event.target;
    const targetItem = targetElement.closest('.cards__card');
    targetItem.remove();
}

// Модальное окно 'редактирование профиля'
buttonEditPopup.addEventListener('click', function () {
    inputUserName.value = profileName.textContent;
    inputUserSpecialty.value = profileSpecialty.textContent;
    openedPopup(editPopup);
});

buttonEditPopupClose.addEventListener('click', function () {
    closePopup(editPopup);
});

formElement.addEventListener('submit', formSubmitHandler);

// Модальное окно 'Добавление места'
buttonAddPopup.addEventListener('click', function () {
    openedPopup(addPopup);

});

buttonAddPopupClose.addEventListener('click', function () {
    closePopup(addPopup);
});

formAddCardsElement.addEventListener('submit', formAddSubmitHandler);

renderList();