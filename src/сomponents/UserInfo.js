export class UserInfo {
  constructor(userName, userOccupation, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userOccupation = document.querySelector(userOccupation);
    this._userAvatar = document.querySelector(userAvatar);
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

  getUserAvatar() {
    return {
      avatar: this._userAvatar.textContent
    }
    
  }
  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}