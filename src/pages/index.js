// Импорт всех классов и объектов с данными
import './index.css';
import { initialCards, selectors, } from '../utils/constants.js';
import {Card} from '../сomponents/Card.js';
import {FormValidator} from '../сomponents/FormValidator.js';
import {Section} from '../сomponents/Section.js';
import {PopupWithForm} from '../сomponents/PopupWithForm.js';
import {PopupWithImage} from '../сomponents/PopupWtihImage.js';
import {UserInfo} from '../сomponents/UserInfo.js';
import {cardAdd, profileEdit, inputPopupName, inputPopupOccupation, formElementCard, formList} from '../utils/elements.js';

// Экземпляры классов и их колбэки
// Экземпляр класса Popup "Редактировать профиль"
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

// Фунция рендеринга карточки при помощи классов Card и Section
function renderCard(item) {
  const card = new Card (item, '#element', handleCardClick);
  const cardElement = card.generateCard();
  createCardSection.setItem(cardElement);
}
// Функция зума (колбэк)
function handleCardClick(name, link) {
  popupZoomCard.openPopup(name, link);
}

// Класс Section для добавления списка карточек
const createCardSection = new Section (
  { 
    data: initialCards,
    renderer: (item) => renderCard(item)
  },
  '.elements'
);
createCardSection.renderItems();

// Экземпляр класса Popup "Редактировать профиль"
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleFormSubmitProfile);
popupEditProfile.setEventListeners();
// Передача данных из попапа в профиль (колбэк)
function handleFormSubmitProfile(InputList) {
  userInfo.setUserInfo(InputList['name'], InputList['occupation']);
  popupEditProfile.closePopup();
}

// Экземлпяр класса Popup "Добавить карточку"
const popupAddCard = new PopupWithForm('.popup_type_add-card', handleFormSubmitCard);
popupAddCard.setEventListeners();
// Создание новой карточки (колбэк)
function handleFormSubmitCard(inputList) {
  const cardData = {
    link: inputList['link'],
    name: inputList['title']
  };
  renderCard(cardData);
}

// Экземпляр класса Popup "Открыть изображение"
const popupZoomCard = new PopupWithImage('.popup_type_card');
popupZoomCard.setEventListeners();


// Остальные слушатели
// Объявление слушателей на странице (не попап)
profileEdit.addEventListener('click', () => {
  const list = userInfo.getUserInfo();
  inputPopupName.value = list['name'];
  inputPopupOccupation.value = list['occupation'];
  popupEditProfile.openPopup();
});

cardAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
});


// Обработка валидации инпутов при помощи FormValidator
formList.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.setDefaultButton();
  formValidator.enableValidation();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  // Добавление слушателя для кнопки "Редактировать профиль" - сброс попапа
  profileEdit.addEventListener ('click', () => {
    formElementCard.reset();
    formValidator.setDefaultButton();
  });
  // Добавление слушателя для кнопки "Добавить карточку" - сброс попапа
  cardAdd.addEventListener('click', () => {
    formElementCard.reset();
    formValidator.setDefaultButton();
  });
});