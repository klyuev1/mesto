const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Объявление всех переменных
// Объявление всех попапов и кнопки закрытия
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
// Объявление кнопок добавить и редактировать в профиле
const cardAdd = document.querySelector('.profile__button-add');
const profileEdit = document.querySelector('.profile__button-edit');
// Объявление темплейта и его родительского элемента
const elements = document.querySelector('.elements');
const element = document.querySelector('#element').content;
// Объявление инпутов профиля и заголовка,подзаголовка профиля
const userName = document.querySelector('.profile__title');
const userOccupation = document.querySelector('.profile__subtitle');
const inputPopupName = document.querySelector('.popup__input[name=name]');
const inputPopupOccupation = document.querySelector('.popup__input[name=occupation]');
const formElementProfile = document.querySelector('.popup__form[name=profile]');
// Объявление инпутов и формы для карточек
const inputPopupTitle = document.querySelector('.popup__input[name=title]');
const inputPopupLink = document.querySelector('.popup__input[name=link]');
const formElementCard = document.querySelector('.popup__form[name=card]');
// Объявление переменных попапа с зумом картинки
const cardImage = document.querySelector('.popup__card-image');
const cardTitle = document.querySelector('.popup__card-title');
const popupZoomCard = document.querySelector('.popup_type_card');
// Объявление кнопки закрытия для всех попапов (нодлист)
const popupCloseButton = document.querySelector('.popup__button-close_card');

class Card {
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

  // Функция закрытия профиля по клавише Escape
  _closePopupKey(evt) {
    if (evt.key ==='Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this._handlePopupClose(openedPopup);
    }
  }
  // Фунция закрытия попапа по нажатию на оверлей
  _closePopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      this._handlePopupClose(evt.target);
    }
  }


  // Методы открытия и закрытия попапов
  _handlePopupOpen(popupElement) {
    popupElement.classList.add('popup_opened');
    //document.addEventListener('keydown', () => this._closePopupKey());
    //popupElement.addEventListener('click', () => this._closePopupOverlay());
  }
  _handlePopupClose(popupElement) {
    popupElement.classList.remove('popup_opened');
    //document.removeEventListener('keydown', () => this._closePopupKey());
    //popupElement.removeEventListener('click', () => this._closePopupOverlay());
  }

  // 3 метода -- функции для каждого из слушателей
  _handleCardLike() {this._elementLike.classList.toggle('element__like_active')}
  _handleCardDelete() {this._element.remove()}
  _handleImgPopup() {
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._handlePopupOpen(popupZoomCard);
  }

  // Метод обработки слушателей
  _setEventListeners(popupCloseButton) {
    this._elementLike.addEventListener('click', () => this._handleCardLike());
    this._deleteCardButton.addEventListener('click', () => this._handleCardDelete());
    this._cardZoom.addEventListener('click', () => this._handleImgPopup());

    this._element.addEventListener('click', () => this._handlePopupOpen(popupZoomCard));
    popupCloseButton.addEventListener('click', () => this._handlePopupClose(popupZoomCard));
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

    this._setEventListeners(popupCloseButton);
    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '#element', );
  const elementCard = card.generateCard();
  elements.append(elementCard);
});

