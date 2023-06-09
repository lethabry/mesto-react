import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup(props) {

  const { values: cardState, handleChange: handleChange, setValues: setCardState } = useForm({ title: '', link: '' });

  React.useEffect(() => {
    setCardState({ title: '', link: '' })
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardState.title, cardState.link);
  }

  const popupAddCardProps = {
    name: 'add',
    isOpen: props.isOpen,
    title: 'Новое место',
    submitButtonTextContent: props.isLoading ? 'Сохранение...' : 'Создать',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit
  }

  return (
    <PopupWithForm {...popupAddCardProps}>
      <input type="text" name="title" value={cardState.title || ''} onChange={handleChange} placeholder="Название" id="title-input"
        className="popup__input popup__input_type_name" minLength="2" maxLength="30" required autoComplete="off" />
      <span className="popup__error title-input-error"></span>
      <input type="url" name="link" value={cardState.link || ''} onChange={handleChange} placeholder="Ссылка на картинку" id="link-input"
        className="popup__input popup__input_type_activity" required autoComplete="off" />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup