import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({titleButton, isOpen, onClose, onUpdateAvatar}) {
    const currentUser = React.useContext(CurrentUserContext);

    //States and effects
    const [isInputAvatarValid, setInputAvatarValid] = React.useState(true);
    const [inputAvatarErrorText, setAvatarErrorText] = React.useState('');

    const [isFormValid, setFormValid] = React.useState(isInputAvatarValid);

    const inputAvatarRef = React.useRef();
    
    React.useEffect( () => {
        setInputAvatarValid(true);
        setAvatarErrorText('');
        setFormValid(isInputAvatarValid);
    }, [isOpen]);

    //Callbacks
    const handleChange = () => {
        setInputAvatarValid(inputAvatarRef.current.validity.valid);
        setAvatarErrorText(inputAvatarRef.current.validationMessage);
        setFormValid(inputAvatarRef.current.validity.valid);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({avatar:inputAvatarRef.current.value});
    }

    return (
        <PopupWithForm 
            name="ava" 
            title="Обновить аватар"  
            nameOfSubmit={titleButton}
            isOpen={isOpen} 
            closeAllPopups={onClose} 
            isSubmitActive={isFormValid}
            onSubmit={handleSubmit}
        >

            <Input 
                inputModificator='popup__input_type_ava-link'
                defaultValue={currentUser.avatar}
                isError={!isInputAvatarValid}
                errorText={inputAvatarErrorText}
                inputRef={inputAvatarRef}
                onChange={handleChange}
                type="url"  
                name="ava-link" 
                id="input-ava-link" 
                placeholder="Ссылка на картинку" 
                required 
            />

        </PopupWithForm>
    );
}

export default EditAvatarPopup;