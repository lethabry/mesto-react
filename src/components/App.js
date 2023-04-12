import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import '../App.css';
import api from '../utils/api';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState({});

  React.useEffect(() => {
    Promise.all([api.getCurrentUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
  }, [])

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

  function handleConfirmDeleteCardClick(card) {
    setIsConfirmDeleteCardPopupOpen(!isConfirmDeleteCardPopupOpen);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
  }

  function handleUpdateUser(name, about) {
    api.changeUserData(name, about).then(userData => {
      setCurrentUser(userData);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar(avatarLink) {
    api.changeAvatar(avatarLink).then(userData => {
      setCurrentUser(userData);
      closeAllPopups();
    })
  }

  function handleAddPlaceSubmit(name, link) {
    api.addNewCard(name, link).then(cardData => {
      setCards([cardData, ...cards]);
      closeAllPopups();
    })
  }

  const mainProps = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick,
    cards: cards,
    onCardLike: handleCardLike,
    onCardDelete: handleConfirmDeleteCardClick,
  }

  const imagePopupProps = {
    card: selectedCard,
    onClosePopup: closeAllPopups
  }

  const editProfilePopupProps = {
    isOpen: isEditProfilePopupOpen,
    onClose: closeAllPopups,
    onUpdateUser: handleUpdateUser
  }

  const editAvatarPopupProps = {
    isOpen: isEditAvatarPopupOpen,
    onClose: closeAllPopups,
    onUpdateAvatar: handleUpdateAvatar
  }

  const addPlacePopupProps = {
    isOpen: isAddPlacePopupOpen,
    onClose: closeAllPopups,
    onAddPlace: handleAddPlaceSubmit
  }

  const confirmDeleteCardPopupProps = {
    isOpen: isConfirmDeleteCardPopupOpen,
    onClose: closeAllPopups,
    onDeleteCard: handleCardDelete,
    card: deleteCard
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main {...mainProps} />
        <Footer />
        <EditProfilePopup {...editProfilePopupProps} />
        <AddPlacePopup {...addPlacePopupProps} />
        <EditAvatarPopup {...editAvatarPopupProps} />
        <ConfirmDeleteCardPopup {...confirmDeleteCardPopupProps} />
        <ImagePopup {...imagePopupProps} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;