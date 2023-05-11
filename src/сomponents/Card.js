export class Card {
  constructor(data, cardTemplateSelector, userId, handleCardClick, handleCardDelete, handleLike, handleDislike) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes.length;
    this._cardId = data._id;
    this._likeStatus = false;
    this._userId = userId;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    
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

  likesSum(card) {
    this._likes = card.likes;
    this._elementLikeText.textContent = this._likes.length;
  }

  likeButton() {
      this._elementLike.classList.add('element__like_active');
      this._likeStatus = true;  
  }
  dislikeButton() {
      this._elementLike.classList.remove('element__like_active');
      this._likeStatus = false;
  }

  // Методы для работы лайка (сервер)
  _toggleLike() {
    if (this._likeStatus === false) {
      this._handleLike(this);
    } else {
      this._handleDislike(this);
    }
  }

  // Метод обработки слушателей
  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._toggleLike());
    
    this._deleteCardButton.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this._element);
    });
    
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
    this._elementLikeText = this._element.querySelector('.element__like-text');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeText.textContent = this._likes;

    // Если в списке лайков есть мой -- сердечко черное
    for (let i = 0; i < this._data.likes.length; i++) {
      if ((this._data.likes[i]._id) === this._userId) {
        this.likeButton();
      }
    }
    // Если это не моя карта -- я не могу ее удалить
    if (this._data.owner._id !== this._userId) {
      this._deleteCardButton.remove();
    }
    
    this._setEventListeners();
    return this._element;
  }
}