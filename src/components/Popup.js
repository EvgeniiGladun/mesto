export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // Модальное окно открытие
    // и закрытие через 'esc'
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // Модальное окно закрытие
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Функция для закрытие через кнопку - 'esc'
    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close();
        }
    }

    // Закртие карточки щелчком по тёмному фону.
    _handlerOverley(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    };

    // Закрытие popup 'картинка' нажатием на крестик
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', (evt) => { this.close(evt) });
        this._popup.addEventListener('mousedown', (evt) => { this._handlerOverley(evt) });
    }
}