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

    document.addEventListener('keydown', handleEscapePress);

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleSideClick}>
            <div className="popup__containter">
                <h2 className="popup__title">{title}</h2>
                <button className="popup__close" type="button" onClick={closeAllPopups}></button>
                <form className="popup__form" name={`${name}-card-form`} noValidate>          
                    {children}
                    <button className="popup__button" type="submit">{nameOfSubmit}</button>
                </form>                  
            </div>
        </div>
    )

}

export default PopupWithForm;