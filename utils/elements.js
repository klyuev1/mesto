// Объявление всех переменных
// Объявление всех попапов и кнопки закрытия
export const popupProfile = document.querySelector('.popup_type_edit-profile');
export const popupCard = document.querySelector('.popup_type_add-card');
// Объявление кнопок добавить и редактировать в профиле
export const cardAdd = document.querySelector('.profile__button-add');
export const profileEdit = document.querySelector('.profile__button-edit');
// Объявление темплейта и его родительского элемента
export const inputPopupName = document.querySelector('.popup__input[name=name]');
export const inputPopupOccupation = document.querySelector('.popup__input[name=occupation]');
// Объявление инпутов и формы для карточек
export const inputPopupTitle = document.querySelector('.popup__input[name=title]');
export const inputPopupLink = document.querySelector('.popup__input[name=link]');
export const formElementCard = document.querySelector('.popup__form[name=card]');
// Объявление переменных попапа с зумом картинки
export const popupZoom = document.querySelector('.popup_type_card');
// Массив форм
export const formList = Array.from(document.querySelectorAll('.popup__form'));