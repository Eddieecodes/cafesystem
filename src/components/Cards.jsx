import React from "react";
import Carditem from "./Carditem";
import './Cards.css';

function Cards(){
    return (
        <div className="cards">
            <h1>The Services We Offer At Cafesystem</h1>
            <div className="cards_container">
                <div className="cards__wrapper">
                    <ul className="cards_items">
                       <Carditem
                       text='Get your digital ticket easily with no hassle'
                       label = 'digitized ticket'
                       path = './services'/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;
