function Card({card, onCardClick, onDeleteClick}) {

    function clickCard() {
        onCardClick(card);
    }

    return (
        <div className="gallery__card">
            <img src={card.link} alt={card.name} className="gallery__pic" onClick={clickCard} />
            <div className="gallery__text-cont">
                <h2 className="gallery__text">{card.name}</h2>
                <div className="gallery__heart-cont">
                    <button className="gallery__heart" type="button"></button>
                    <p className="gallery__heart-likes">{card.likes.length}</p>
                </div>
            </div>
            <button className="gallery__delete gallery__delete_displayed" type="button" onClick={onDeleteClick}></button>
        </div>   
    )

}

export default Card;