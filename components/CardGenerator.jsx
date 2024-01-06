
import { useState, useEffect } from 'react'
export default function CardGenerator(){

    const api_key = "" //UNSPLASH API KEY
    //values that can be shown on the player card
    const [card, setCard] = useState({
        nameText: "",
        classText: "",
        strText: "",
        dexText: "",
        conText: "",
        intText: "",
        wisText: "",
        chaText: "",
        cardImage: "https://images.unsplash.com/photo-1685132159042-5fa51cd902ee",
        photographerName: "1millidollars",
        photographerProfileUrl: "https://unsplash.com/@1millidollars"
    })

    const [allCards, setAllCards] = useState([])

    //when user types something into the textboxes
    function handleInput(event){
        const {name, value} = event.target 
        setCard(prevCard => ({
            ...prevCard,
            [name]:value
        }))
    }

    //get images to be shown on the card
    useEffect(() => {
        async function getCardImages() {
            const response = await fetch("https://api.unsplash.com/photos/random?query=warrior&orientation=portrait&content_filter=high&count=30&client_id="+api_key)
            const responseData = await response.json()
            setAllCards(responseData)
        }
        getCardImages()
    }, [])

    

    //display another image
    function getNewImage(){
        const randNum = Math.floor(Math.random() * allCards.length)
        const newUrl = allCards[randNum].urls.small
        const newPhotographer = allCards[randNum].user.name 
        const newProfileURL = allCards[randNum].user.links.html
        setCard(prevCard => ({
            ...prevCard,
            cardImage: newUrl,
            photographerName: newPhotographer,
            photographerProfileUrl: newProfileURL
        }))
    }

    return(
        <main>
        <div className = "statsForm"> 
            <input
                type = "text"
                placeholder = "name"
                className = "formInput"
                name = "nameText"
                value = {card.nameText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "class"
                className = "formInput"
                name = "classText"
                value = {card.classText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "strength value"
                className = "formInput"
                name = "strText"
                value = {card.strText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "dexerty value"
                className = "formInput"
                name = "dexText"
                value = {card.dexText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "constitution value"
                className = "formInput"
                name = "conText"
                value = {card.conText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "intelligence value"
                className = "formInput"
                name = "intText"
                value = {card.intText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "wisdom value"
                className = "formInput"
                name = "wisText"
                value = {card.wisText}
                onChange = {handleInput}
            />
            <input
                type = "text"
                placeholder = "charisma value"
                className = "formInput"
                name = "chaText"
                value = {card.chaText}
                onChange = {handleInput}
            />
            <button 
                className = "generateButton"
                onClick = {getNewImage}
            >New Image</button>
        </div>
        <div className = "card--container">
        <img src = {card.cardImage}/>
            {card.nameText.length>0 && <h4 className = "card--text top left">NAME: {card.nameText}</h4>}
            {card.classText.length>0 && <h4 className = "card--text middle left">CLASS: {card.classText}</h4>}
            {card.strText.length>0 && <h4 className = "card--text bottom left">STR: {card.strText}</h4>}
            {card.dexText.length>0 && <h4 className = "card--text bottom--second left">DEX: {card.dexText}</h4>}
            {card.conText.length>0 && <h4 className = "card--text bottom--third left">CON: {card.conText}</h4>}
            {card.intText.length>0 && <h4 className = "card--text bottom--fourth left">INT: {card.intText}</h4>}
            {card.wisText.length>0 && <h4 className = "card--text bottom--fifth left">WIS: {card.wisText}</h4>}
            {card.chaText.length>0 && <h4 className = "card--text bottom--sixth left">CHA: {card.chaText}</h4>}
        </div>
        <p className="photographer-credit">Photographer: <a href={card.photographerProfileUrl}>{card.photographerName}</a> via Unsplash</p>
        </main>
    )
}