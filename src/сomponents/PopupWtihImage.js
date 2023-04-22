import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
   constructor(popupSelector) {
    super(popupSelector);
      this._cardImage = this._popupSelector.querySelector('.popup__card-image');
      this._cardTitle = this._popupSelector.querySelector('.popup__card-title');
   }

   openPopup(name, link) {
    super.openPopup();
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardTitle.textContent = name;
   }
}