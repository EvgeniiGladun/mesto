export default class UserInfo {
    // Элементы: имя пользователя и информация о себе
    constructor({ userName, userSpecialty }) {
        this._userName = document.querySelector(userName);
        this._userSpecialty = document.querySelector(userSpecialty);
        this._formUserName = document.querySelector('.popup__text_user_name');
        this._formUserSpecialty = document.querySelector('.popup__text_user_specialty');
        this._userInfo = this.getUserInfo();
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
    setFormUserInfo() {
        this._formUserName.value = this._userInfo.name;
        this._formUserSpecialty.value = this._userInfo.specialty;
    }
}