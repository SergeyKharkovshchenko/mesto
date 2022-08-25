const popupNameElement = document.querySelector('.popup__field-for-name');
const popupJobElement = document.querySelector('.popup__field-for-job');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

export default class UserInfo {

    constructor(nameDescription, jobDescription){
        this._nameDescription = nameDescription;
        this._jobDescription = jobDescription;
    }

    getUserInfo (){
        popupNameElement.value = this._nameDescription;
        popupJobElement.value = this._jobDescription;      
    }

    setUserInfo (){
        nameElement.textContent = popupNameElement.value;
        jobElement.textContent = popupJobElement.value;
    }

}