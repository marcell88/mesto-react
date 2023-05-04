import React from 'react';
import Input from './Input';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({titleButton, isOpen, onClose, onAddPic}) {

    //Validation hook
    const validation = useFormAndValidation();

    //States and effects
    const [picName, setPicName] = React.useState('');
    const [picLink, setPicLink] = React.useState('');
    React.useEffect( () => {
        setPicName('');
        setPicLink('');
        validation.resetForm(false);
    }, [isOpen]);

    //Callbacks
    const handlePicNameChange = (e) => {
        setPicName(e.target.value);
        validation.handleChange(e);
    }

    const handlePicLinkChange = (e) => {
        setPicLink(e.target.value);
        validation.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPic({
            name:picName,
            link:picLink,
        });
    }

    return (

        <PopupWithForm 
            name="add" 
            title="Новое место" 
            nameOfSubmit={titleButton} 
            isOpen={isOpen} 
            closeAllPopups={onClose} 
            onSubmit={handleSubmit}
            isSubmitActive={validation.isValid}
        >

            <Input 
                inputModificator='popup__input_type_pic-name'
                value={picName}
                onChange={handlePicNameChange}
                isError={!validation.isValid}
                errorText={validation.errors['pic-name']}
                type="text" 
                name="pic-name" 
                id="input-pic-name" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30" 
            />

            <Input 
                inputModificator='popup__input_type_pic-link'
                value={picLink}
                onChange={handlePicLinkChange}
                isError={!validation.isValid}
                errorText={validation.errors['pic-link']}
                type="url"  
                name="pic-link" 
                id="input-pic-link" 
                placeholder="Ссылка на картинку" 
                required 
            />

        </PopupWithForm>

    );
}

export default AddPlacePopup;