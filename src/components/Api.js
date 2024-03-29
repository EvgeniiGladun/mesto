export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // Запрос массив карточек
    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            headers: this.headers
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    // другие методы работы с API
    getInitialUsers() {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    setInitialUsers(name, about) {
        return fetch(this.baseUrl + '/users/me',
            {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    setAddNewCard(name, link) {
        return fetch(this.baseUrl + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    deleteCard(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this.headers,
        })

            .then((res) => {
                return this._getResponseData(res);
            })
    }

    pushLike(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId + '/likes/', {
            method: 'PUT',
            headers: this.headers,
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    deleteLike(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId + '/likes/', {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    setNewAvatar(avatar) {
        return fetch(this.baseUrl + '/users/me/avatar/', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

}