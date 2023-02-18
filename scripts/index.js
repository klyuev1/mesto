// Объявление всех переменных
let popup = document.querySelector('.popup');
let profileButtonEdit = document.querySelector('.profile__button-edit');
let popupButtonClose = document.querySelector('.popup__button-close'); 
let userName = document.querySelector('.profile__title');
let userOccupation = document.querySelector('.profile__subtitle');
let inputPopupName = document.querySelector('.popup__input_name');
let inputPopupOccupation = document.querySelector('.popup__input_occupation');
let formElement = document.querySelector('.popup__form');

// Открытие+закрытие попапа, передача данных в инпут
function showPopup () {
  popup.classList.add('popup_opened');
  inputPopupName.value = userName.textContent;
  inputPopupOccupation.value = userOccupation.textContent;
}
function closePopup () {
  popup.classList.remove('popup_opened');
}

profileButtonEdit.addEventListener('click', showPopup);
popupButtonClose.addEventListener('click', closePopup);

// Передача данных в профиль
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = inputPopupName.value;
  userOccupation.textContent = inputPopupOccupation.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);