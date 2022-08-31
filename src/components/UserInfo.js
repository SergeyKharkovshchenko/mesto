export default class UserInfo {

    constructor(userNameSelector, jobDescriptionSelector) {
        this._nameDescription = document.querySelector(userNameSelector);
        this._jobDescription = document.querySelector(jobDescriptionSelector);
    }

    GetUserInfo() {
        return {
            name: this._nameDescription.textContent,
            description: this._jobDescription.textContent
        }
    }

    setUserInfo({
        name,
        description
    }) {
        this._nameDescription.textContent = name;
        this._jobDescription.textContent = description;
    }


}