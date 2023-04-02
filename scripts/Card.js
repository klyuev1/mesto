export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  // 3 метода -- функции для каждого из слушателей
  _handleCardLike() {this._elementLike.classList.toggle('element__like_active')}
  _handleCardDelete() {this._element.remove()}

  // Метод обработки слушателей
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleCardLike());
    this._deleteCardButton.addEventListener('click', () => this._handleCardDelete());
    this._cardZoom.addEventListener('click', () => {
      this._handleCardClick(this._name,this._link);
    });
  }

  // Публичный метод открытия карточки
  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._deleteCardButton = this._element.querySelector('.element__remove');
    this._cardZoom = this._element.querySelector('.element__image-button');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}