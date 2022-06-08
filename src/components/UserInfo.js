export default class UserInfo {
    // Элементы: имя пользователя и информация о себе
    constructor({ userName, userSpecialty }) {
        this._userName = document.querySelector(userName);
        this._userSpecialty = document.querySelector(userSpecialty);
    }

    // Возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._userName.textContent,
            specialty: this._userSpecialty.textContent,
        }
    }

    // Принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, specialty) {
        this._userName.textContent = name;
        this._userSpecialty.textContent = specialty;
    }

    // Принимает новые данные пользователя и добавляет их в форму "редактировать профиль"
    setFormUserInfo(userData) {
        this._userName.value = userData.name;
        this._userSpecialty.value = userData.specialty;
    }
}