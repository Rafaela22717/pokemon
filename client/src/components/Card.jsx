import React from "react";
import "../Styles.css/Card.css"

function Card(props) {
    
    return(
        
        <div className="cardPoke">
                <h1 className="pokeN">{props.name}</h1>
            <div className="card" >
                <img src={props.image} alt="Poke" width='90px' height='90px'/>
            </div>
              
                 <div className="img">
                    {props.type?.map(i => (
                    
                        <h4 className="elem" >{i.name}</h4>//types
                      
                        ))}
                  </div>
                
        </div>
          
    );
};

export default Card;















/* export default function Card({name,image,types}) {//paso por props
    return (
        <div>
            <h3>{name}</h3>
            <h4>{types}</h4>       
            <img src={image} alt="img not found" width="200px"  heigth="250px"/>
          {/*   <h5>{ types?.map((elem) => {
             if(typeof elem ==="object") {
                 return elem.name;
             } else {
                 return elem;
             }
            }).join(", ") }
        </h5> *///}
        //</div>
    
   // )}

 // */