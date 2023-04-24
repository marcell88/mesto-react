function ImagePopup({card, closeAllPopups}) {

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

    document.addEventListener('keydown', handleEscapePress);

    return (

        <div className={`popup popup_type_pic ${card ? 'popup_opened' : ''}`} onClick={handleSideClick}>
            <div className="popup__containter-pic">
                <img src={card.link} alt={card.name} className="popup__pic" />
                <h2 className="popup__text">{card.name}</h2>
                <button className="popup__close" type="button" onClick={closeAllPopups}></button>
            </div>
        </div>

    )
}

export default ImagePopup;