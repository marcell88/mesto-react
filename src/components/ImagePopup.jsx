import React from 'react';

function ImagePopup({card, isOpen, closeAllPopups}) {

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
        <div className="popup popup_type_pic popup_opened" onClick={handleSideClick}>
            <div className="popup__containter-pic">
                <img src={card.link} alt={card.name} className="popup__pic" />
                <h2 className="popup__text">{card.name}</h2>
                <button className="popup__close" type="button" onClick={closeAllPopups} />
            </div>
        </div>
    )
}

export default ImagePopup;