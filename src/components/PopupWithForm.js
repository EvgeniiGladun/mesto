import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    // Возвращает массив-объектов всех полей формы.
    _getInputValues() {
        this._formValues = {};
        this._inputList = Array.from(this._form.querySelectorAll('.popup__text'));
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    // закрытие формы и сброс полей.
    close() {
        super.close();
        this._form.reset();
    }

    // Навешиваем слушателей на кнопку отправления
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        })
    }

}