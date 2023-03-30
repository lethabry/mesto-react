import React from "react";

function Card({ card, onCardClick }) {
  return (
    <li key={card._id} className="places__card">
      <img onClick={() => { onCardClick(card) }} src={card.link} className="places__image" alt={card.name} />
      <button type="button" className="places__button places__button_type_trash" aria-label="Кнопка удаления"></button>
      <div className="places__name">
        <h2 className="places__title">{card.name}</h2>
        <div className="places_likes">
          <button type="button" className="places__button places__button_type_like" aria-label="Кнопка лайка"></button>
          <p className={`places__counter ${card.likes.length > 0 && `places__counter_active`}`}>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card