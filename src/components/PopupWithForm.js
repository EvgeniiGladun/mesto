import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__text');
        this._handleFormSubmit = handleFormSubmit;
        this._InputsByName = this._getInputsByName();
    }

    // Возвращает массив-объектов всех полей формы.
    _getInputValues() {

        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
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

    _getInputsByName() {
        this._inputListByName = {};

        this._inputList.forEach(input => {
            this._inputListByName[input.name] = input;
        });

        return this._inputListByName;
    }

    setData(formData) {
        this._InputsByName;

        Object.keys(formData).forEach(key => { this._inputListByName[key].value = formData[key] });
    }
}