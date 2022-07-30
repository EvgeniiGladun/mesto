export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Рендеринг карточек на сайт
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    // Добавление скилета карточек
    addItem(element) {
        this._container.append(element);
    };

    // Добавление карточки в начала списка
    prependItem(cardElement) {
        this._container.prepend(cardElement);
    }
}