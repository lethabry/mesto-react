import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [cardState, setCardState] = React.useState({ title: '', link: '' });

  React.useEffect(() => {
    setCardState({ title: '', link: '' })
  }, [props.isOpen])

  function handleChange(e) {
    setCardState({ ...cardState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardState.title, cardState.link);
  }

  const popupAddCardProps = {
    name: 'add',
    isOpen: props.isOpen,
    title: 'Новое место',
    children: <>
      <input onChange={handleChange} value={cardState.title || ''} type="text" name="title" placeholder="Название" id="title-input"
        className="popup__input popup__input_type_name" minLength="2" maxLength="30" required autoComplete="off" />
      <span className="popup__error title-input-error"></span>
      <input onChange={handleChange} value={cardState.link || ''} type="url" name="link" placeholder="Ссылка на картинку" id="link-input"
        className="popup__input popup__input_type_activity" required autoComplete="off" />
      <span className="popup__error link-input-error"></span>
    </>,
    submitButtonTextContent: 'Создать',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit
  }

  return (
    <PopupWithForm {...popupAddCardProps} />
  )
}

export default AddPlacePopup