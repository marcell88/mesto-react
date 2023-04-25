import React from 'react';

function PopupWithForm({name, title, nameOfSubmit, isOpen, children, closeAllPopups}) {

    function handleEscapePress(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }

    function handleSideClick(evt) {
        if (evt.target === evt.currentTarget) {
            closeAllPopups();
        }
    }

    React.useEffect( () => {
        if (isOpen) {document.addEventListener('keydown', handleEscapePress)}
        return () => {document.removeEventListener('keydown', handleEscapePress)};
    }, [isOpen])

    return isOpen && (
        <div className="popup popup_type_${name} popup_opened" onClick={handleSideClick}>
            <div className="popup__containter">
                <h2 className="popup__title">{title}</h2>
                <button className="popup__close" type="button" onClick={closeAllPopups} />
                <form className="popup__form" name={`${name}-card-form`} noValidate>          
                    {children}
                    <button className="popup__button" type="submit">{nameOfSubmit}</button>
                </form>                  
            </div>
        </div>
    )

}

export default PopupWithForm;