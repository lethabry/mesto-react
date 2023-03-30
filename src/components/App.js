import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../App.css';
import React from 'react';
import { findAllByTestId } from '@testing-library/react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  const mainProps = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick
  }

  const popupEditProfileProps = {
    name: 'edit',
    isOpen: isEditProfilePopupOpen,
    title: 'Редактировать профиль',
    children: <>
      <input type="text" name="name" placeholder="Ваше имя" id="name-input"
        className="popup__input popup__input_type_name" minLength="2" maxLength="40" required autoComplete="off" />
      <span className="popup__error name-input-error"></span>
      <input type="text" name="activity" placeholder="Ваша деятельность" id="activity-input"
        className="popup__input popup__input_type_activity" minLength="2" maxLength="200" required autoComplete="off" />
      <span className="popup__error activity-input-error"></span>
    </>,
    submitButtonTextContent: 'Сохранить',
    onClosePopup: closeAllPopups
  }

  const popupAddCardProps = {
    name: 'add',
    isOpen: isAddPlacePopupOpen,
    title: 'Новое место',
    children: <>
      <input type="text" name="title" placeholder="Название" id="title-input"
        className="popup__input popup__input_type_name" minLength="2" maxLength="30" required autoComplete="off" />
      <span className="popup__error title-input-error"></span>
      <input type="url" name="link" placeholder="Ссылка на картинку" id="link-input"
        className="popup__input popup__input_type_activity" required autoComplete="off" />
      <span className="popup__error link-input-error"></span>
    </>,
    submitButtonTextContent: 'Создать',
    onClosePopup: closeAllPopups
  }

  const popupEditAvatarProps = {
    name: 'avatar',
    isOpen: isEditAvatarPopupOpen,
    title: 'Обновить аватар',
    children: <>
      <input type="url" name="link" placeholder="Ссылка на аватар" id="avatar-link-input"
        className="popup__input popup__input_type_activity" required autoComplete="off" />
      <span className="popup__error avatar-link-input-error"></span>
    </>,
    submitButtonTextContent: 'Сохранить',
    onClosePopup: closeAllPopups
  }

  const imagePopupProps = {
    card: selectedCard,
    onClosePopup: closeAllPopups
  }

  return (
    <div className="page">
      <Header />
      <Main {...mainProps} />
      <Footer />
      <PopupWithForm {...popupEditProfileProps} />
      <PopupWithForm {...popupAddCardProps} />
      <PopupWithForm {...popupEditAvatarProps} />
      <ImagePopup {...imagePopupProps} />
    </div>
  );
}

export default App;