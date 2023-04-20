// Импорт всех классов и объектов с данными
import { initialCards, selectors, } from '../utils/constants.js';
import {Card} from '../сomponents/Card.js';
import {FormValidator} from '../сomponents/FormValidator.js';
import {Section} from '../сomponents/Section.js';
import {PopupWithForm} from '../сomponents/PopupWithForm.js';
import {PopupWithImage} from '../сomponents/PopupWtihImage.js';
import {UserInfo} from '../сomponents/UserInfo.js';
import {popupProfile, popupCard, cardAdd, profileEdit, inputPopupName, inputPopupOccupation, inputPopupTitle, inputPopupLink, formElementCard, popupZoom, formList} from '../utils/elements.js';

// Экземпляр класса Popup "Редактировать профиль"
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');


// Экземпляр класса Popup "Редактировать профиль"
const popupEditProfile = new PopupWithForm(popupProfile, handleFormSubmitProfile);
popupEditProfile.setEventListeners();

profileEdit.addEventListener('click', () => {
  const list = userInfo.getUserInfo();
  inputPopupName.value = list['name'];
  inputPopupOccupation.value = list['occupation']; // Корявенько как-то
  popupEditProfile.openPopup();
});

// Передача данных из попапа в профиль.
function handleFormSubmitProfile(InputList) {
  userInfo.setUserInfo(InputList['name'], InputList['occupation']);
  popupEditProfile.closePopup();
}

// Экземлпяр класса Popup "Добавить карточку"
const popupAddCard = new PopupWithForm(popupCard); // Сюда не передается функция
popupAddCard.setEventListeners();

cardAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
});

// Экземпляр класса Popup "Открыть изображение"
const popupZoomCard = new PopupWithImage(popupZoom);
popupZoomCard.setEventListeners();

// Функция зума
function handleCardClick(name, link) {
  popupZoomCard.openPopup(name, link);
}


// Класс Section
// Класс Section для добавления списка карточек
const createCardSection = new Section (
  { 
    data: initialCards,
    renderer: (item) => {
      const card = new Card (item, '#element', handleCardClick);
      const cardElement = card.generateCard();
      createCardSection.setItem(cardElement);
    }
  },
  '.elements'
);
createCardSection.renderItems();

// Добавление новой карточки при помощи renderItem()
const cardList = {
  link: '',
  name: ''
}
formElementCard.addEventListener('submit', () => {
  cardList.link = inputPopupLink.value;
  cardList.name = inputPopupTitle.value;
  createCardSection.renderItem(cardList);
  popupAddCard.closePopup();
});

// Обработка валидации инпутов при помощи FormValidator. Новый класс Section
const validateForm = new Section (
  { 
    data: formList,
    renderer: (formElement) => {
      const formValidator = new FormValidator(selectors, formElement);
      formValidator.setDefaultButton();
      formValidator.enableValidation();
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      cardAdd.addEventListener('click', () => {
        formElementCard.reset();
        formValidator.setDefaultButton();
      });
    }
  });
validateForm.renderItems();