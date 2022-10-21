import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitBtnForm = this._form.querySelector('[type="submit"]');
    }

    // Говорим пользьователю что идёт сохранение
    changingTextLoading(isTextLoading) {
        if (isTextLoading) {
            this._submitBtnForm.textContent = isTextLoading;
        };
    }

    // Навешиваем слушателей на кнопку отправления
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit();
        })
    }
}