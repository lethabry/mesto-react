import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [profileState, setProfileState] = React.useState({ name: '', about: '' });

  React.useEffect(() => {
    setProfileState({ name: currentUser.name, about: currentUser.about })
  }, [props.isOpen]);

  function handleChange(e) {
    setProfileState({ ...profileState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(profileState.name, profileState.about);
  }

  const popupWithFormProps = {
    name: 'edit',
    isOpen: props.isOpen,
    title: 'Редактировать профиль',
    children: <>
      <input onChange={handleChange} value={profileState.name || ''} type="text" name="name" placeholder="Ваше имя" id="name-input"
        className="popup__input popup__input_type_name" minLength="2" maxLength="40" required autoComplete="off" />
      <span className="popup__error name-input-error"></span>
      <input onChange={handleChange} value={profileState.about || ''} type="text" name="about" placeholder="Ваша деятельность" id="activity-input"
        className="popup__input popup__input_type_activity" minLength="2" maxLength="200" required autoComplete="off" />
      <span className="popup__error activity-input-error"></span>
    </>,
    submitButtonTextContent: 'Сохранить',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit
  }

  return (
    <PopupWithForm {...popupWithFormProps} />
  )
}

export default EditProfilePopup