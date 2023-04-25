import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';

function App() {

    //States
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    
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

    const handleDeleteCardClick = () => {
        setDeleteCardPopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setSelectedCard(false);
    }

    //App
    return (

        <div className="page">

            <Header />

            <Main 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onDeleteClick={handleDeleteCardClick}
                closeAllPopups={closeAllPopups}
            />

            <Footer />

            <PopupWithForm 
                name="edit" 
                title="Редактировать профиль" 
                nameOfSubmit="Сохранить" 
                isOpen={isEditProfilePopupOpen} 
                closeAllPopups={closeAllPopups} 
            >
                <label className="popup__label">
                    <input className="popup__input popup__input_type_name" 
                        type="text" 
                        name="name" 
                        id="input-name" 
                        placeholder="Ваше имя" 
                        required 
                        minLength="2" 
                        maxLength="40" 
                    />
                    <span className="input-name-error popup__error" />
                </label>    
                <label className="popup__label">
                    <input className="popup__input popup__input_type_job" 
                        type="text" 
                        name="job" 
                        id="input-job" 
                        placeholder="Расскажите о себе" 
                        required 
                        minLength="2" 
                        maxLength="200" 
                    />
                    <span className="input-job-error popup__error" />
                </label>     
            </PopupWithForm>

            <PopupWithForm 
                name="add" 
                title="Новое место" 
                nameOfSubmit="Создать" 
                isOpen={isAddPlacePopupOpen} 
                closeAllPopups={closeAllPopups} 
            >
                <label className="popup__label">
                    <input className="popup__input popup__input_type_pic-name" 
                        type="text" 
                        name="pic-name" 
                        id="input-pic-name" 
                        placeholder="Название" 
                        required 
                        minLength="2" 
                        maxLength="30" 
                    />
                    <span className="input-pic-name-error popup__error" />      
                </label>
                <label className="popup__label">
                    <input className="popup__input popup__input_type_pic-link" 
                        type="url"  
                        name="pic-link" 
                        id="input-pic-link" 
                        placeholder="Ссылка на картинку" 
                        required 
                    />
                    <span className="input-pic-link-error popup__error" />
                </label>
            </PopupWithForm>

            <PopupWithForm 
                name="ava" 
                title="Обновить аватар"  
                nameOfSubmit="Сохранить" 
                isOpen={isEditAvatarPopupOpen} 
                closeAllPopups={closeAllPopups} 
            >
                <label className="popup__label">
                    <input className="popup__input popup__input_type_ava-link" 
                        type="url"  
                        name="ava-link" 
                        id="input-ava-link" 
                        placeholder="Ссылка на картинку" 
                        required 
                    />
                    <span className="input-ava-link-error popup__error" />
                </label>
            </PopupWithForm>

            <PopupWithForm 
                name="delete" 
                title="Вы уверены?" 
                nameOfSubmit="Да" 
                isOpen={isDeleteCardPopupOpen} 
                closeAllPopups={closeAllPopups} 
            />

            <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} />
        
        </div>

    );
}

export default App;
