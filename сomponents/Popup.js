export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupCloseButton = this._popupSelector.querySelector('.popup__button-close');
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
    this.closePopup();
    }
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
  }
  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
  }
  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.closePopup());
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.closePopup();
      }
    });
  }
}