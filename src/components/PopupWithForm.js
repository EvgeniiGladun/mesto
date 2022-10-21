import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        // this._hideErrorSpan = hideErrorSpan;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__text');
        this._submitBtnForm = this._form.querySelector('[type="submit"]');
    }

    // Возвращает массив-объектов всех полей формы.
    _getInputValues() {

        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    // закрытие формы и сброс формы.
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

    // Забор информаций из полей 'input'
    _getInputsByName() {
        this._inputListByName = {};

        this._inputList.forEach(input => {
            this._inputListByName[input.name] = input;
        });

        return this._inputListByName;
    }

    // Встраиваем значения в ключи = 'input'
    setInputValues(data) {
        this._inputList.forEach((input) => {
            // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
            input.value = data[input.name];
        });
    }

    // Говорим пользьователю что идёт сохранение
    changingTextLoading(isTextLoading) {
        if (isTextLoading) {
            this._submitBtnForm.textContent = isTextLoading;
        };
    }
}