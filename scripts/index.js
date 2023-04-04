// Импорт всех классов и объектов с данными
import {initialCards,selectors} from './array.js'
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

// Объявление всех переменных
// Объявление всех попапов и кнопки закрытия
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
const closeButtons = document.querySelectorAll('.popup__button-close');
// Массив форм
const formList = Array.from(document.querySelectorAll('.popup__form'));


// Функция закрытия профиля по клавише Escape
function closePopupKey(evt) {
  if (evt.key ==='Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
// Фунция закрытия попапа по нажатию на оверлей
function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}
// Функции открытия и закрытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
  popupElement.addEventListener('click', closePopupOverlay);
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKey);
  popupElement.removeEventListener('click', closePopupOverlay);
}

// Функция добавления слушателя для крестика всех попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Добавление слушателя для кнопки "Редактировать профиль"
profileEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputPopupName.value = userName.textContent;
  inputPopupOccupation.value = userOccupation.textContent;
});

// Передача данных из попапа в профиль
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputPopupName.value;
  userOccupation.textContent = inputPopupOccupation.value;
  closePopup(popupEditProfile);
}
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

// Функция зума
function handleCardClick(name, link) {
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  openPopup(popupZoomCard);
}

// Обработка массива при помощи класса Card
initialCards.forEach((item) => {
  const card = new Card(item, '#element',handleCardClick);
  const elementCard = card.generateCard();
  elements.append(elementCard);
});

//Добавление новой карточки при помощи класса Card
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardList = {
    link: inputPopupLink.value,
    name: inputPopupTitle.value
  }
  const card = new Card(cardList, '#element', handleCardClick);
  const elementCard = card.generateCard();
  elements.prepend(elementCard);
  closePopup(popupAddCard);
  evt.target.reset();
}
formElementCard.addEventListener('submit', handleFormSubmitCard);

// Обработка валидации инпутов при помощи FormValidator

formList.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.setDefaultButton();
  formValidator.enableValidation();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formValidator.enableValidation();
  });
  // Добавление слушателя для кнопки "Добавить карточку"
  cardAdd.addEventListener('click', () => {
    openPopup(popupAddCard);
    formElementCard.reset();
    formValidator.setDefaultButton();   
  });
});