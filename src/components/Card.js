export default class Card {
  constructor(inputValues, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._name = inputValues.name;
    this._link = inputValues.link;
  }

  // Удаление карточки с сайта
  _removeItem() {
    this._cardElement.remove();
  }

  // Поставить <лайк> карточке
  _likeItem() {
    this._buttonLike.classList.toggle('cards__rectangle-like_active');
  }

  // Открытие картинки карточки на весь экран
  _openCardImage() {
    this._bigImageCard = cardImgPopup
      .querySelector('.popup__img');
    this._titleImgPopup = cardImgPopup
      .querySelector('.popup__title_img');
    this._bigImageCard.setAttribute('src', this._link);
    this._bigImageCard.setAttribute('alt', this._name);
    this._titleImgPopup.textContent = this._name;

  }

  // Приватный метод для создания скилетов карточкам
  _createCloneCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.cards__card')
      .cloneNode(true); // делаю клонирование каждой карточки и встраиваю в DOM-дерева
    return cardElement; // Возвращаем 'cardElement'
  }

  // Функция гинераций карточек
  generateCard() {
    this._cardElement = this._createCloneCard();
    this._setEventListeners(); // навешиваю на все карточки слушателей

    this._cardImage.src = `${this._link}`; // Встраиваю ссылки для отображения картинки
    this._cardImage.alt = this._name; // Встраиваю заголовки для отображения в <alt>
    this._cardElement.querySelector('.cards__title').textContent = this._name; // Встраиваю заголовки для отображения в карточки
    return this._cardElement;
  }

  // Приватный-Метод навешивания слушателей на каждую карту
  _setEventListeners() {
    this._removeButton = this._cardElement.querySelector('.cards__rectangle-remove');
    this._buttonLike = this._cardElement.querySelector('.cards__rectangle-like');
    this._cardImage = this._cardElement.querySelector('.cards__image');

    this._removeButton.addEventListener('click', () => {
      this._removeItem();
    });

    this._buttonLike.addEventListener('click', () => {
      this._likeItem();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });


  }

}
