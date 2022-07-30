export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, idUser, toPutLike, deleteLike) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes || [];
    this._idLike = '';
    this._toPutLike = toPutLike;
    this._deleteLike = deleteLike;
    this._idCard = data._id;
    this._idOwner = data.owner._id;
    this._idUser = idUser;
  }

  // Удаление карточки с сайта
  removeItem() {
    this._cardElement.remove();
  }

  // Поставить <лайк> карточке
  likeItem(updateLike) {
    this._buttonLike.classList.toggle('card__rectangle-like_active');
    this._quantityLike.textContent = updateLike.length;
  }

  // Проверяем поставлен ли лайк на карточке
  checkLike() {
    this._idLike = this._like.map((like) => like._id)
    if (this._idLike.includes(this._idUser)) {
      this._buttonLike.classList.add('card__rectangle-like_active');
    } else {
      this._buttonLike.classList.remove('card__rectangle-like_active');
    }
  }

  // Приватный метод для создания скилетов карточкам
  _createCloneCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card__cards')
      .cloneNode(true); // делаю клонирование каждой карточки и встраиваю в DOM-дерева
    return cardElement; // Возвращаем 'cardElement'
  }

  // Функция гинераций карточек
  generateCard() {
    this._cardElement = this._createCloneCard();
    this._setEventListeners(); // навешиваю на все карточки слушателей

    this._cardImage.src = `${this._link}`; // Встраиваю ссылки для отображения картинки
    this._cardImage.alt = this._name; // Встраиваю заголовки для отображения в <alt>
    this._quantityLike.textContent = this._like.length;
    this._cardElement.querySelector('.card__title').textContent = this._name; // Встраиваю заголовки для отображения в карточки
    return this._cardElement;
  }

  // Возвращаем id карточки
  getId() {
    return this._idCard;
  }

  // Приватный-Метод навешивания слушателей на каждую карту
  _setEventListeners() {
    this._removeButton = this._cardElement.querySelector('.card__rectangle-remove');
    this._buttonLike = this._cardElement.querySelector('.card__rectangle-like');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._quantityLike = this._cardElement.querySelector('.card__quantity-like');
    this._removeButton.classList.toggle('card__rectangle-remove_hide', this._idOwner !== this._idUser);


    // Проверка: Удаление корзины у карточки
    this._removeButton.addEventListener('click', () => {

      this._handleCardDelete(this._idCard, this);
    });

    // Удаляем лайк или ставим
    this._buttonLike.addEventListener('click', () => {

      if (this._buttonLike.classList.contains('card__rectangle-like_active')) {

        this._deleteLike(this._idCard, this);
      } else {

        this._toPutLike(this._idCard, this);
      }
    });

    this._cardImage.addEventListener('click', () => {

      this._handleCardClick(this._name, this._link);
    });

    this.checkLike();
  }

}
