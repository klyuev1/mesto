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

// Добавление слушателя для кнопки "Добавить карточку"
cardAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
  resetForm(popupAddCard, selectors);
  setDefaultButton(popupAddCard,selectors);
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
function handleImgPopup(evt) {
  cardImage.src = evt.target.src;
  cardImage.alt = evt.target.alt;
  cardTitle.textContent = evt.target.alt;
  openPopup(popupZoomCard);
}


// Обработка одной фотокарточки из массива
function addElement(item) {
  const elementCopy = element.cloneNode(true);
  const elementImage = elementCopy.querySelector('.element__image');
  const elementTitle = elementCopy.querySelector('.element__title');
  const cardZoom = elementCopy.querySelector('.element__image-button');
  const elementLike = elementCopy.querySelector('.element__like');
  const deleteCard = elementCopy.querySelector('.element__remove');

  //Добавление кнопки "Удалить карточку"
  deleteCard.addEventListener('click', () => {
    const choiseCard = deleteCard.closest('.element');
    choiseCard.remove();
  });

  //Добавление кнопки "Лайк"
  elementLike.addEventListener('click',(evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  //Добавление зума
  cardZoom.addEventListener('click', handleImgPopup);

  //Присваивание данных из массива элементам
  elementTitle.textContent = item.name;
  elementImage.setAttribute('src',item.link);
  elementImage.setAttribute('alt',item.name);

  return elementCopy;
};


// Обработка массива при помощи функции addElement
function addCard(item) {
const cadrsTemplate = addElement(item);
elements.append(cadrsTemplate);
};
initialCards.forEach(addCard);


//Добавление новой карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputPopupTitle.value,
    link: inputPopupLink.value
  }
  const cadrsTemplate = addElement(newCard);
  elements.prepend(cadrsTemplate);
  closePopup(popupAddCard);
  evt.target.reset();
}
formElementCard.addEventListener('submit', handleFormSubmitCard);