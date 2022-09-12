export default class UserInfo {

    constructor({
        userNameSelector,
        jobDescriptionSelector,
        avatarSelector,
        id,
        cohort
    }) {
        this._nameDescription = document.querySelector(userNameSelector);
        this._jobDescription = document.querySelector(jobDescriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._id = id
        this._cohort = cohort
    }

    getUserInfo() {
        return {
            name: this._nameDescription.textContent,
            about: this._jobDescription.textContent,
            avatar: this._avatar,
            _id: "be6e0a88cceace486bcffd5d",
            cohort: 'cohort-50'
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