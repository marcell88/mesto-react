import React from 'react';

function Input({inputModificator, value, onChange, isError, errorText, inputRef, defaultValue, ...stdInputProps}) {

    return (
        <label className="popup__label">
            <input className={`popup__input ${inputModificator}`}
                ref={inputRef}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                type={stdInputProps.type} 
                name={stdInputProps.name}  
                id={stdInputProps.id} 
                placeholder={stdInputProps.placeholder}
                required={stdInputProps.required}
                minLength={stdInputProps.minLength} 
                maxLength={stdInputProps.maxLength} 
            />
            <span className={`popup__error ${isError ? 'popup__error_visible' : ''}`}>{errorText}</span>
        </label>    
    )

}

export default Input;

