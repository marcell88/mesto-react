import React from 'react';
import Input from './Input';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({titleButton, isOpen, onClose, onAddPic}) {

    //States and effects
    const [isInputPicNameValid, setInputPicNameValid] = React.useState(true);
    const [inputPicNameErrorText, setPicInputNameErrorText] = React.useState('');
    const inputPicNameRef = React.useRef();

    const [isInputPicLinkValid, setInputPicLinkValid] = React.useState(true);
    const [inputPicLinkErrorText, setInputPicLinkErrorText] = React.useState('');
    const inputPicLinkRef = React.useRef();

    const [isFormValid, setFormValid] = React.useState(false);

    const [picName, setPicName] = React.useState('');
    const [picLink, setPicLink] = React.useState('');

    React.useEffect( () => {
        setInputPicNameValid(true);
        setInputPicLinkValid(true);
        setPicInputNameErrorText('');
        setInputPicLinkErrorText('');
        setFormValid(false);
    }, [isOpen]);

    //Callbacks
    const handlePicNameChange = (e) => {
        setPicName(e.target.value);
        setInputPicNameValid(inputPicNameRef.current.validity.valid);
        setPicInputNameErrorText(inputPicNameRef.current.validationMessage);
        setFormValid(inputPicNameRef.current.validity.valid && inputPicLinkRef.current.validity.valid);
    }

    const handlePicLinkChange = (e) => {
        setPicLink(e.target.value);
        setInputPicLinkValid(inputPicLinkRef.current.validity.valid);
        setInputPicLinkErrorText(inputPicLinkRef.current.validationMessage);
        setFormValid(inputPicNameRef.current.validity.valid && inputPicLinkRef.current.validity.valid);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPic({
            name:picName,
            link:picLink,
        });
        setPicName('');
        setPicLink('');
    }

    const handleClose = () => {
        onClose();
        setPicName('');
        setPicLink('');
    }

    return (

        <PopupWithForm 
            name="add" 
            title="Новое место" 
            nameOfSubmit={titleButton} 
            isOpen={isOpen} 
            closeAllPopups={handleClose} 
            onSubmit={handleSubmit}
            isSubmitActive={isFormValid}
        >

            <Input 
                inputModificator='popup__input_type_pic-name'
                value={picName}
                onChange={handlePicNameChange}
                isError={!isInputPicNameValid}
                errorText={inputPicNameErrorText}
                inputRef={inputPicNameRef}
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
                isError={!isInputPicLinkValid}
                errorText={inputPicLinkErrorText}
                inputRef={inputPicLinkRef}
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