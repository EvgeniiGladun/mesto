import { initialCards as items } from '../utils/constants.js';

export default class Section {
    constructor({ data: items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.append(element);
    };

    prependItem(cardElement) {
        this._container.prepend(cardElement);
    }
}