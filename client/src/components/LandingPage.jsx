import React from "react";
import {Link} from "react-router-dom";
import "../Styles.css/LandingPage.css";


export default function LandingPage() {

    return(
        <div className="landingPage">
        <div>
            <h1 class="tit" >WELCOME</h1>
            <Link to = "/home">
                <button className="botonIngresar">Get into</button>
                </Link>
        </div>
        </div>
    );
};