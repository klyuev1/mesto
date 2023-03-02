// Подгружаем массив с карточками
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
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupCloseProfile = document.querySelector('.popup_button-close_type_profile');
const popupCloseCard = document.querySelector('.popup_button-close_type_card');
// Объявление кнопок добавить и редактировать в профиле
const cardAdd = document.querySelector('.profile__button-add');
const profileEdit = document.querySelector('.profile__button-edit');
// Объявление инпутов профиля и заголовка,подзаголовка профиля
const userName = document.querySelector('.profile__title');
const userOccupation = document.querySelector('.profile__subtitle');
const inputPopupName = document.querySelector('.popup__input[name=name]');
const inputPopupOccupation = document.querySelector('.popup__input[name=occupation]');
const formElementProfile = document.querySelector('.popup__form[name=profile]');
// Объявление темплейта и его родительского элемента
const elements = document.querySelector('.elements');
const element = document.querySelector('#element').content;
// Объявление инпутов и формы для карточек
const inputPopupTitle = document.querySelector('.popup__input[name=title]');
const inputPopupLink = document.querySelector('.popup__input[name=link]');
const formElementCard = document.querySelector('.popup__form[name=card]');
// Объявление переменных попапа с зумом картинки
const cardImage = document.querySelector('.popup__card-image');
const cardTitle = document.querySelector('.popup__card-title');
const popupZoomCard = document.querySelector('.popup_type_card');
const popupCloseZoom = document.querySelector('.popup_button-close_type_zoom');


// Функции открытия и закрытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}


// Добавление слушателя для кнопки "Редактировать профиль"
profileEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputPopupName.value = userName.textContent;
  inputPopupOccupation.value = userOccupation.textContent;
});
popupCloseProfile.addEventListener('click', () => closePopup(popupEditProfile));


// Добавление слушателя для кнопки "Добавить карточку"
cardAdd.addEventListener('click', () => openPopup(popupAddCard));
popupCloseCard.addEventListener('click', () => closePopup(popupAddCard));


// Передача данных из попапа в профиль
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputPopupName.value;
  userOccupation.textContent = inputPopupOccupation.value;
  closePopup(popupEditProfile);
}
formElementProfile.addEventListener('submit', handleFormSubmitProfile);


// Функция зума
function handleImgPopup(evt) {
  openPopup(popupZoomCard);
  cardImage.src = evt.target.src;
  cardTitle.textContent = evt.target.alt;
}


// Обработка массива и добавление его в верстку
elementAdd = function (item) {
  const elementCopy = element.cloneNode(true);
  const elementImage = elementCopy.querySelector('.element__image');
  const elementTitle = elementCopy.querySelector('.element__title');
  elementTitle.textContent = item.name;
  elementImage.setAttribute('src',item.link);

  //Добавление кнопки "Удалить карточку"
  const deleteCard = elementCopy.querySelector('.element__remove');
  deleteCard.addEventListener('click', () => {
    const choiseCard = deleteCard.closest('.element');
    choiseCard.remove();
  });
  //-----------------------------------

  //Добавление кнопки "Лайк"
  elementCopy.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //-----------------------------------

  //Добавление зума
  const cardZoom = elementCopy.querySelector('.element__image-button');
  cardZoom.addEventListener('click', handleImgPopup);
  popupCloseZoom.addEventListener('click', () => closePopup(popupZoomCard));
  //-----------------------------------

  elements.append(elementCopy);
};
initialCards.forEach(elementAdd);


//Добавление новой карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const elementCopy = element.cloneNode(true);
  const elementImage = elementCopy.querySelector('.element__image');
  const elementTitle = elementCopy.querySelector('.element__title');
  elementTitle.textContent = inputPopupTitle.value;
  elementImage.setAttribute('src',inputPopupLink.value);

  //Добавление кнопки "Удалить карточку"
  const deleteCard = elementCopy.querySelector('.element__remove');
  deleteCard.addEventListener('click', () => {
    const choiseCard = deleteCard.closest('.element');
    choiseCard.remove();
  });
  //-----------------------------------
  //Добавление кнопки "Лайк"
  elementCopy.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //-----------------------------------

  //Добавление зума
  const cardZoom = elementCopy.querySelector('.element__image-button');
  cardZoom.addEventListener('click', handleImgPopup);
  popupCloseZoom.addEventListener('click', () => closePopup(popupZoomCard));
  //-----------------------------------

  elements.prepend(elementCopy);
  closePopup(popupAddCard);
}
formElementCard.addEventListener('submit', handleFormSubmitCard);