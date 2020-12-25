let buttonEditPopup = document.querySelector('.profile__edit-button');

let buttonEditPopupClose = document.querySelector('.popup__close');

let editPopup = document.querySelector('.popup');

let inputName = document.querySelector('.popup__text_name')
let inputSpecialty = document.querySelector('.popup__text_specialty')
let profileName = document.querySelector('.profile__name')
let profileSpecialty = document.querySelector('.profile__specialty')

function openedPopup(popup) {
popup.classList.add('popup_opened');
}

buttonEditPopup.addEventListener('click', function() {
   inputName.value = profileName.textContent;
   inputSpecialty.value = profileSpecialty.textContent;
   openedPopup(editPopup)
});

function closePopup(popup) {
   popup.classList.remove('popup_opened');
   }
   
   buttonEditPopupClose.addEventListener('click', function() {
      closePopup(editPopup)
   });



let formElement = document.querySelector('.popup__form');
console.log(formElement);

function formSubmitHandler (evt) {
   evt.preventDefault(); 
   console.log('форма отпралена');
   profileName.textContent = inputName.value;
   profileSpecialty.textContent = inputSpecialty.value;
   closePopup(editPopup)
}

formElement.addEventListener('submit', formSubmitHandler);
