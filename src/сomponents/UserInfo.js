export class UserInfo {
  constructor(userName, userOccupation) {
    this._userName = document.querySelector(userName);
    this._userOccupation = document.querySelector(userOccupation);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      occupation: this._userOccupation.textContent 
    }
    
  }
  setUserInfo(name,occupation) {
    this._userName.textContent = name;
    this._userOccupation.textContent = occupation;
  }
}