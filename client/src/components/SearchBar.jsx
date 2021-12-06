import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNamePokemons} from "../actions/actionsIndex.js"
import "../Styles.css/SearchBar.css";


export default function SearchBar() {
const dispatch = useDispatch();
const [name,setName] = useState("");//tengo q guardar en mi estado local lo q valla apareciendo en el input

function handleInputChange(e) {
e.preventDefault();
setName(e.target.value);
}

function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePokemons(name))//name aca es mi estado local,guardo loq tipea usuario en mi est local name

}


return (
        <div className= "inputSearch" >
         <input   className= "marginR" type = "text" placeholder = "Pokemon..." onChange = {e => handleInputChange(e)}/>
         <button className="marginB" type = "submit"  onClick={(e)=>handleSubmit(e) }>Search</button>
      </div>
);
};



