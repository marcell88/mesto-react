import React from 'react';
import Card from '../components/Card.jsx';
import api from '../utils/api.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick}) {

    const [userName, setUserName] = React.useState('loading...');
    const [userDescription, setDescription] = React.useState('loading...');
    const [userAvatar, setAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect( () => {
        api.getUserInfo()
            .then(user => {
                if (user.name && user.about && user.avatar) {
                    setUserName(user.name);
                    setDescription(user.about);
                    setAvatar(user.avatar);                    
                }
            })
            .catch(err => {console.log(err)});    
    }, []);

    React.useEffect( () => {
        api.getInitialCards()
            .then(cards => {
                setCards(cards);
            })
            .catch(err => {console.log(err)});
    }, []);

    return (
        
        <main className="main">

            <section className="profile">
                <div className="profile__description">
                    <button className="profile__avatar" type="button" style={{ backgroundImage: `url(${userAvatar})` }} onClick={onEditAvatar}></button>
                    <div className="profile__text-cont">
                        <div className="profile__name-cont">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>    
                        </div>
                        <p className="profile__about">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="gallery">
                {cards.map( item => (<Card card={item} onDeleteClick={onDeleteClick} onCardClick={onCardClick} key={item._id} />) )}
            </section>

        </main>
    )    

}

export default Main;