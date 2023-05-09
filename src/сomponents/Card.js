import {api} from '../pages/index.js';

export class Card {
  constructor(data, cardTemplateSelector, userId, handleCardClick, handleCardDelete) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes.length;
    this._cardId = data._id;
    this._likeStatus = false;
    this._userId = userId;
    this._handleCardDelete = handleCardDelete;
    
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

  _setLike() {
    this._elementLike.classList.add('element__like_active');
    this._likeStatus = true;
  }

  _setDislike() {
    this._elementLike.classList.remove('element__like_active');
    this._likeStatus = false;
  }

  _likesSum(num) {
    this._elementLikeText.textContent = num;
  }

  // Методы для работы лайка (сервер)
  _toggleLike() {
    if (this._likeStatus=== false) {
      api.likeCard(this._cardId).then((res) => {
        this._setLike();
        this._likesSum(res.likes.length);
        
      });
    } else {
      api.dislikeCard(this._cardId).then((res) => {
        this._setDislike()
        this._likesSum(res.likes.length);
      });
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
        this._setLike();
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