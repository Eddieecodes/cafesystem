import React from "react";

function Carditem(props){
    return(
        <>
        
        <div className="card_div">
        <div className="card__container__div">
            <h2>Digitized Ticket</h2>
            <h4>Get your digitized ticket without need of physcial interaction. Just upload your student receipt</h4>
        </div>
        <div className="card__container__div">
            <h2>Ticket Management</h2>
            <h4>Get your tickets managed for you daily, keeping track of your daily feeding</h4>
        </div>
        <div className="card__container__div">
            <h2>Student Records</h2>
            <h4>All student details recorded for easy access across our database ensuring swift ticketing</h4>
        </div>
        <div className="card__container__div">
            <h2>Data Management</h2>
            <h4>We manage your information for you to easily obtain and get access to your tickets</h4>
        </div>
        </div>
        </>
    )
}

export default Carditem;