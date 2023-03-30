import React, { useEffect, useState } from "react";
import Card from "./Card";
import api from "../utils/api";


function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [card, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getCards(), api.getCurrentUser()])
      .then(([cards, userData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar);
        setCards(...card, cards);
      })
      .catch(err => console.log(`Error: ${err.status}`))
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className='profile__table'>
          <div className="profile__images">
            <img src={userAvatar} alt="Фотография профиля" className="profile__avatar" />
            <button onClick={props.onEditAvatar} type="button" className="profile__button profile__button_type_avatar"
              aria-label="Кнопка редактирования аватара"></button>
          </div>
          <div className="profile__info">
            <div className="profile__string">
              <h1 className="profile__title">{userName}</h1>
              <button onClick={props.onEditProfile} type="button" className="hover profile__button profile__button_type_edit"
                aria-label="Кнопка редактирования профиля"></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="hover profile__button profile__button_type_add"
          aria-label="Кнопка добавления фотографий"></button>
      </section>
      <section className="places" aria-label="Места">
        <ul className="places__cards">
          {card.map(el => (
            <Card card={el} key={el._id} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>

    </main>
  )
}

export default Main