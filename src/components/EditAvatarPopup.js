import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarLink = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarLink.current.value);
  }

  React.useEffect(() => {
    avatarLink.current.value = ''
  }, [props.isOpen])

  const popupEditAvatarProps = {
    name: 'avatar',
    isOpen: props.isOpen,
    title: 'Обновить аватар',
    children: <>
      <input type="url" ref={avatarLink} name="link" placeholder="Ссылка на аватар" id="avatar-link-input"
        className="popup__input popup__input_type_activity" required autoComplete="off" />
      <span className="popup__error avatar-link-input-error"></span>
    </>,
    submitButtonTextContent: 'Сохранить',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit,
  }

  return (
    <PopupWithForm {...popupEditAvatarProps} />
  )
}

export default EditAvatarPopup