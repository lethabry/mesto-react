import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  const popupWithFormProps = {
    name: 'delete',
    isOpen: props.isOpen,
    title: 'Вы уверены?',
    submitButtonTextContent: 'Да',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit
  }

  return (
    <PopupWithForm {...popupWithFormProps} />
  )
}

export default ConfirmDeleteCardPopup