import React from "react";
import './Herosection.css';
import { Button } from "./Button";
// import '../App.css'

function Herosection(){
    console.log("HeroSection Loaded");

    return(
        <div className="hero-container">
        <video autoPlay loop muted playsInline className="video-bg">
            <source src="/assets/8616854-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
    
        <h1 className="herotext">Cafeteria flow streamlined for you</h1>
        <p>What are you waiting for?</p>
    
        <div className="hero-btns">
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                GET STARTED
            </Button>
            <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
                LOGIN
            </Button>
        </div>
    </div>
    
    );
}
export default Herosection;