export default class UserInfo {
    // Элементы: имя пользователя и информация о себе
    constructor({ userName, userSpecialty, userAvatar }) {
        this._userName = document.querySelector(userName);
        this._userSpecialty = document.querySelector(userSpecialty);
        this._userAvatar = document.querySelector(userAvatar);
    }

    // Возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._userName.textContent,
            specialty: this._userSpecialty.textContent,
        }
    }

    // Принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, specialty, avatar) {
        this._userName.textContent = name;
        this._userSpecialty.textContent = specialty;
        this._userAvatar.src = avatar;
    }
}