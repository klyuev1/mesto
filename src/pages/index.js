// Импорт всех классов и объектов с данными
import './index.css';
import {selectors} from '../utils/constants.js';
import {Card} from '../сomponents/Card.js';
import {FormValidator} from '../сomponents/FormValidator.js';
import {Section} from '../сomponents/Section.js';
import {PopupWithForm} from '../сomponents/PopupWithForm.js';
import {PopupWithImage} from '../сomponents/PopupWtihImage.js';
import {PopupWithConfirmation} from '../сomponents/PopupWithConfirmation.js';
import {UserInfo} from '../сomponents/UserInfo.js';
import {Api} from '../сomponents/Api.js';
import {cardAdd, profileEdit, inputPopupName, inputPopupOccupation, formElementCard, FormElementProfile, FormElementCard, AvatarButton, FormElementAvatar} from '../utils/elements.js';

let createCardSection = null;
let userId = '';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '64e76916-bb9d-45f2-aa0a-555c04a49e1a',
    'Content-Type': 'application/json'
  }
});

// Сервер. Полечение данных о профиле и карточках
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
});

api.getInitialCards()
  .then((CardsData) => {
    createCardSection = new Section (
    { 
      data: CardsData,
      renderer: (item) => renderCard(item)},'.elements');
      createCardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
});

// Фунция рендеринга карточки при помощи классов Card и Section и ее колбеки
function renderCard(item) {
  const card = new Card (item, '#element', userId, handleCardClick, handleCardDelete);
  const cardElement = card.generateCard();
  createCardSection.setItem(cardElement);
}

function handleCardClick(name, link) {
  popupZoomCard.openPopup(name, link);
}

function handleCardDelete (cardId, element) {
  popupDelete.openPopup();
  popupDelete.setData(cardId, element);
}

// Колбеки классов
function handleFormDelete(cardId, element) {
  api.deleteCard(cardId)
  .then((res) => {
    element.remove();
    popupDelete.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleFormSubmitCard(inputList, submitButton) {
  submitButton.textContent = 'Сохранение...';
  const cardData = {
    link: inputList['link'],
    name: inputList['title']
  };
  api.postNewCard(cardData)
  .then((data) =>{
    renderCard(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => submitButton.textContent = 'Сохранить');
}

function handleFormSubmitProfile(InputList, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.patchUserInfo(InputList['name'], InputList['occupation'])
  .then((res) => {
    userInfo.setUserInfo(InputList['name'], InputList['occupation']);
    popupEditProfile.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => submitButton.textContent = 'Сохранить');
}

function handleFormSubmitAvatar(inputList, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.patchAvatar(inputList['avatar'])
  .then((res)=> {
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => submitButton.textContent = 'Сохранить');
}

// Экзмемпляры классов
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleFormSubmitProfile);
popupEditProfile.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitAvatar);
popupAvatar.setEventListeners(); 

const popupAddCard = new PopupWithForm('.popup_type_add-card', handleFormSubmitCard);
popupAddCard.setEventListeners();

const popupZoomCard = new PopupWithImage('.popup_type_card');
popupZoomCard.setEventListeners();

const popupDelete = new PopupWithConfirmation('.popup_type_delete', handleFormDelete);
popupDelete.setEventListeners();


// Обработка валидации при помощи FormValidator
const formValidatorProfile = new FormValidator(selectors, FormElementProfile);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(selectors, FormElementCard);
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(selectors, FormElementAvatar);
formValidatorAvatar.enableValidation();

// Слушатели
profileEdit.addEventListener ('click', () => {
  const list = userInfo.getUserInfo();
  inputPopupName.value = list['name'];
  inputPopupOccupation.value = list['occupation'];
  popupEditProfile.openPopup();
  
  formElementCard.reset();
  formValidatorProfile.setDefaultButton();
});

cardAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
  formElementCard.reset();
  formValidatorCard.setDefaultButton();
});    

AvatarButton.addEventListener('click', () => {
  popupAvatar.openPopup();
  FormElementAvatar.reset();
  formValidatorAvatar.setDefaultButton();
});