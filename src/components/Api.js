export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    // Запрос массив карточек
    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {

                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    // другие методы работы с API
    getInitialUsers() {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
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

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
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

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this.headers,
        })

            .then((res) => {

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    pushLike(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId + '/likes/', {
            method: 'PUT',
            headers: this.headers,
        })
            .then((res) => {

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteLike(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId + '/likes/', {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
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

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

}