// Кнопка открытия и закрытия
let profileEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__button-close'); 

function showAndClosePopup () {
  popup.classList.toggle('popup_opened');
}

profileEdit.addEventListener('click', showAndClosePopup);

popupClose.addEventListener('click', showAndClosePopup);


//Дублирование данных в попап
let userName = document.querySelector('.profile__title');
let userOccupation = document.querySelector('.profile__subtitle');

let inputPopupName = document.querySelector('.popup__name');
let inputPopupOccupation = document.querySelector('.popup__occupation');

inputPopupName.value = userName.textContent;
inputPopupOccupation.value = userOccupation.textContent;

// Передача данных в профиль
let popupSubmit = document.querySelector('.popup__button-save');

popupSubmit.addEventListener('click', save);

function save() {
  userName.textContent = inputPopupName.value;
  userOccupation.textContent = inputPopupOccupation.value;
  popup.classList.toggle('popup_opened');
}
console.log (popup.classList);
