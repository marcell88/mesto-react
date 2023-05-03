import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import SubmitCardDelete from './SubmitCardDelete.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

    //States
    const titleButtonEditProfileDefault = 'Сохранить';
    const titleButtonAddPicDefault = 'Создать';
    const titleButtonEditAvatarDefault = 'Сохранить';
    const titleButtonDeleteDefault = 'Да';

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [titleButtonEditProfile, setButtonEditProfile] = React.useState(titleButtonEditProfileDefault);
  
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [titleButtonAddPic, setTitleButtonAddPic] = React.useState(titleButtonAddPicDefault);

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [titleButtonEditAvatar, setTitleButtonEditAvatar] = React.useState(titleButtonEditAvatarDefault);

    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
    const [titleButtonDelete, setTitleButtonDelete] = React.useState(titleButtonDeleteDefault);

    const [selectedCard, setSelectedCard] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [cardToDelete, setCardToDelete] = React.useState({});

    //Effects
    React.useEffect( () => {
        api.getUserInfo()
            .then(user => {
                if (user) {
                    setCurrentUser(user);
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
    
    //Callbacks
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleDeleteCardClick = (card) => {
        setDeleteCardPopupOpen(true);
        setCardToDelete(card);
    }

    const handleCardDelete = (card) => {
        const isOwner = card.owner._id === currentUser._id;
        setTitleButtonDelete('Удаление...')
        if (isOwner) {
            api.deleteCard(card._id)
            .then( data => {
                setCards( cards.filter(c => c._id !== card._id) );
                closeAllPopups();
            })
            .catch(err => {console.log(err)})
            .finally(() => setTitleButtonDelete(titleButtonDeleteDefault))
        }
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then(newCard => {
            setCards( cards.map(c => c._id === card._id ? newCard : c) );
        });
    }

    const handleUpdateUser = (user) => {
        setButtonEditProfile('Сохранение...')
        api.editProfile(user)
        .then( data => {
            setCurrentUser( data );
            closeAllPopups();
        })
        .catch(err => {console.log(err)})
        .finally(() => setButtonEditProfile(titleButtonEditProfileDefault))
    }

    const handleUpdateAvatar = (user) => {
        setTitleButtonEditAvatar('Сохранение...')
        api.editAvatar(user)
        .then( data => {
            setCurrentUser( data );
            closeAllPopups();
        })
        .catch(err => {console.log(err)})
        .finally(() => setTitleButtonEditAvatar(titleButtonEditAvatarDefault))
    }

    const handleAddPlaceSubmit = ({name, link}) => {
        setTitleButtonAddPic('Создание...')
        api.addNewCard({name, link})
        .then( newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(err => {console.log(err)})
        .finally(() => setTitleButtonAddPic(titleButtonAddPicDefault))
    }

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setSelectedCard({});
        setCardToDelete({});
    }

    //App
    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                <Header />

                <Main 
                    cards={cards}
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleEditAvatarClick} 
                    onCardClick={handleCardClick} 
                    onDeleteClick={handleDeleteCardClick}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                />

                <Footer />
                
                <EditProfilePopup 
                    titleButton={titleButtonEditProfile} 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser}
                /> 
                
                <AddPlacePopup 
                    titleButton={titleButtonAddPic} 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups} 
                    onAddPic={handleAddPlaceSubmit}
                />
                
                <EditAvatarPopup 
                    titleButton={titleButtonEditAvatar} 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <SubmitCardDelete 
                    titleButton={titleButtonDelete} 
                    isOpen={isDeleteCardPopupOpen} 
                    onClose={closeAllPopups} 
                    onSubmitDelete={handleCardDelete} 
                    cardToDelete={cardToDelete}
                />

                {(Object.keys(selectedCard).length > 0) && <ImagePopup 
                    card={selectedCard} 
                    isOpen={Object.keys(selectedCard).length > 0} 
                    closeAllPopups={closeAllPopups} 
                />}
            
            </div>

        </CurrentUserContext.Provider>

    );
}

export default App;
