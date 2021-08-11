import { openPopup, cardImgPopup } from "./Index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

  // Удаление карточки с сайта
  _removeItem() {
    this._cardElement.remove();
  }

  // Поставить <лайк> карточке
  _likeItem() {
    this._buttonLike.classList.toggle("cards__rectangle-like_active");
  }

  // Открытие картинки карточки на весь экран
  _openCardImage() {
    this._bigImageCard = document
      .querySelector(".popup-img")
      .querySelector(".popup__img");
    this._titleImgPopup = document
      .querySelector(".popup-img")
      .querySelector(".popup__title_img");
    this._bigImageCard.setAttribute("src", this._link);
    this._bigImageCard.setAttribute("alt", this._name);
    this._titleImgPopup.textContent = this._name;

    openPopup(cardImgPopup);
  }

  // Приватный-Метод навешивания слушателей на каждую карту
  _setEventListeners() {
    this._removeButton = this._cardElement.querySelector(
      ".cards__rectangle-remove"
    );
    this._buttonLike = this._cardElement.querySelector(
      ".cards__rectangle-like"
    );
    this._cardImage = this._cardElement.querySelector(".cards__image");

    this._removeButton.addEventListener("click", () => {
      this._removeItem();
    });
    this._buttonLike.addEventListener("click", () => {
      this._likeItem();
    });

    this._cardImage.addEventListener("click", () => {
      this._openCardImage();
    });
  }

  // Функция гинераций карточек
  generateCard() {
    // Приватный метод для создания скилетов карточкам
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true); // делаю клонирование каждой карточки и встраиваю в DOM-дерева
    this._setEventListeners(); // навешиваю на все карточки слушателей

    this._cardImage.src = `${this._link}`; // Встраиваю ссылки для отображения картинки
    this._cardImage.alt = this._name; // Встраиваю заголовки для отображения в <alt>
    this._cardElement.querySelector(".cards__title").textContent = this._name; // Встраиваю заголовки для отображения в карточки
    return this._cardElement; // Возврашаю метод обратно на 50 строку, для повторного создания скилета карточки
  }
}
