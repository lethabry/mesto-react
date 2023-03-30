import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && `popup_active`}`} tabIndex="0">
      <div className="popup__block">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`${props.name}`} method="post" noValidate>
          {props.children}
          <button type="submit" className="popup__button popup__button_type_save">{props.submitButtonTextContent}</button>
        </form>
        <button onClick={props.onClosePopup} type="button" className="hover popup__button popup__button_type_close"
          aria-label="Кнопка закрытия окна"></button>
      </div>
    </div>
  )
}

export default PopupWithForm