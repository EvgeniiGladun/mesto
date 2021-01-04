let buttonEditPopup = document.querySelector(".profile__edit-button");
let buttonEditPopupClose = document.querySelector(".popup__close");
let editPopup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");

let inputUserName = document.querySelector(".popup__text_user_name");
let inputUserSpecialty = document.querySelector(".popup__text_user_specialty");
let profileName = document.querySelector(".profile__name");
let profileSpecialty = document.querySelector(".profile__specialty");

function openedPopup() {
    inputUserName.value = profileName.textContent;
    inputUserSpecialty.value = profileSpecialty.textContent;
    editPopup.classList.add("popup_opened");
}

function closePopup() {
    editPopup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputUserName.value;
    profileSpecialty.textContent = inputUserSpecialty.value;
    closePopup(editPopup);
}

buttonEditPopup.addEventListener("click", openedPopup);

buttonEditPopupClose.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);
