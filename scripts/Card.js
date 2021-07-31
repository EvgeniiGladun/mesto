import {openPopup, cardImgPopup} from './index.js'

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
        
        _likeItem() {
            this._buttonLike.classList.toggle('cards__rectangle-like_active');
        }

        _openCardImage() {
            this._bigImageCard = document.querySelector('.popup-img').querySelector('.popup__img');
            this._titleImageCard = document.querySelector('.popup-img').querySelector('.popup__title_img');
            this._bigImageCard.setAttribute('src', this._link);
            this._bigImageCard.setAttribute('alt', this._name);
            this._titleImageCard.textContent = this._name;
        
            openPopup(cardImgPopup);
        }

        // На
      _setEventListeners() {
        this._buttonCarzin = this._cardElement.querySelector('.cards__rectangle-remove');
        this._buttonLike = this._cardElement.querySelector('.cards__rectangle-like');
        this._imageInCard = this._cardElement.querySelector('.cards__image');
        

        this._buttonCarzin.addEventListener('click', () => {
            this._removeItem();
        });
        this._buttonLike.addEventListener('click', () => {
            this._likeItem();
        });

        this._imageInCard.addEventListener('click', () => {
            this._openCardImage();
        });
    
    }
    
// Функция гинераций карточек
    _generateCard() { // Приватный метод для создания скилетов карточкам
        this._cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.cards__card')
        .cloneNode(true); // делаю клонирование каждой карточки и встраиваю в DOM-дерева
        this._setEventListeners(); // навешиваю на все карточки слушателей

        this._cardElement.querySelector('.cards__image').src = `${this._link}`; // Встраиваю ссылки для отображения картинки  
        this._cardElement.querySelector('.cards__title').textContent = this._name; // Встраиваю заголовки для отображения в карточки  
        return this._cardElement; // Возврашаю метод обратно на 50 строку, для повторного создания скилета карточки
    }

    newPublickGenerate() { // публичный метод для использования вне Card.js
        return this._generateCard(); // возврашаю функцию снова на переменную card, что бы функция выполнялась не бесконечно.
    }
    
}