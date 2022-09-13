export default class UserInfo {

    constructor({
        userNameSelector,
        jobDescriptionSelector,
        avatarSelector,
    }) {
        this._nameDescription = document.querySelector(userNameSelector);
        this._jobDescription = document.querySelector(jobDescriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameDescription.textContent,
            about: this._jobDescription.textContent,
            avatar: this._avatar,
            _id: this._id,
            cohort: this._cohort
        }
    }

    setUserInfo(
        user
    ) {
        this._nameDescription.textContent = user.name;
        this._jobDescription.textContent = user.about;
        this._avatar = user.avatar;
        this._id = user._id;
        this._cohort = user.cohort;
    }

}