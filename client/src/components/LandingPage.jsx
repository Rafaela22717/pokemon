import React from "react";
import {Link} from "react-router-dom";
import "../Styles.css/LandingPage.css";


export default function LandingPage() {

    return(
        <div className="landingPage">
        <div>
            <h1>WELCOME</h1>
            <Link to = "/home">
                <button className="botonIngresar">Ingresar</button>
                </Link>
        </div>
        </div>
    );
};