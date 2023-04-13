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
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen = isConfirmDeleteCardPopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  React.useEffect(() => {
    Promise.all([api.getCurrentUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => console.log(`Error: ${err.status}`))
  }, [])

  React.useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

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
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Error: ${err.status}`));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.changeUserData(name, about)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.status}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api.changeAvatar(avatarLink)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.status}`))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api.addNewCard(name, link)
      .then(cardData => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.status}`))
      .finally(() => setIsLoading(false))
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
    onUpdateUser: handleUpdateUser,
    isLoading: isLoading
  }

  const editAvatarPopupProps = {
    isOpen: isEditAvatarPopupOpen,
    onClose: closeAllPopups,
    onUpdateAvatar: handleUpdateAvatar,
    isLoading: isLoading
  }

  const addPlacePopupProps = {
    isOpen: isAddPlacePopupOpen,
    onClose: closeAllPopups,
    onAddPlace: handleAddPlaceSubmit,
    isLoading: isLoading
  }

  const confirmDeleteCardPopupProps = {
    isOpen: isConfirmDeleteCardPopupOpen,
    onClose: closeAllPopups,
    onDeleteCard: handleCardDelete,
    card: deleteCard,
    isLoading: isLoading
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