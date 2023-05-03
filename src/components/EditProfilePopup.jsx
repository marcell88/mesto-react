import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({titleButton, isOpen, onClose, onUpdateUser}) {
    
    //Context
    const currentUser = React.useContext(CurrentUserContext);

    //States and effects
    const [isInputNameValid, setInputNameValid] = React.useState(true);
    const [inputNameErrorText, setInputNameErrorText] = React.useState('');
    const inputNameRef = React.useRef();

    const [isInputDescriptionValid, setInputDescriptionValid] = React.useState(true);
    const [inputDescriptionErrorText, setInputDescriptionErrorText] = React.useState('');
    const inputDescriptionRef = React.useRef();

    const [isFormValid, setFormValid] = React.useState(true);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect( () => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setInputNameValid(true);
        setInputDescriptionValid(true);
        setInputNameErrorText('');
        setInputDescriptionErrorText('');
        setFormValid(true);
    }, [currentUser, isOpen]);

    //Callbacks
    const handleNameChange = (evt) => {
        setName(evt.target.value);
        setInputNameValid(inputNameRef.current.validity.valid);
        setInputNameErrorText(inputNameRef.current.validationMessage);
        setFormValid(inputNameRef.current.validity.valid && inputDescriptionRef.current.validity.valid);
    }

    const handleAboutChange = (evt) => {
        setDescription(evt.target.value);
        setInputDescriptionValid(inputDescriptionRef.current.validity.valid);
        setInputDescriptionErrorText(inputDescriptionRef.current.validationMessage);
        setFormValid(inputNameRef.current.validity.valid && inputDescriptionRef.current.validity.valid);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm 
            name="edit" 
            title="Редактировать профиль" 
            nameOfSubmit={titleButton}
            isOpen={isOpen} 
            closeAllPopups={onClose}
            isSubmitActive={isFormValid}
            onSubmit={handleSubmit}
        >
            
            <Input 
                inputModificator='popup__input_type_name'
                value={name}
                onChange={handleNameChange}
                isError={!isInputNameValid}
                errorText={inputNameErrorText}
                inputRef={inputNameRef}
                type="text" 
                name="name" 
                id="input-name" 
                placeholder="Ваше имя" 
                required 
                minLength="2" 
                maxLength="40" 
            />

            <Input 
                inputModificator='popup__input_type_job'
                value={description}
                onChange={handleAboutChange}
                isError={!isInputDescriptionValid}
                errorText={inputDescriptionErrorText}
                inputRef={inputDescriptionRef}
                type="text" 
                name="job" 
                id="input-job" 
                placeholder="Расскажите о себе" 
                required 
                minLength="2" 
                maxLength="200" 
            />

        </PopupWithForm>

    );
}

export default EditProfilePopup;