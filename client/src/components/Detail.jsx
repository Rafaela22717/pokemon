import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actionsIndex";
import { useEffect,useState } from "react";
import "../Styles.css/Detail.css"


export default function Detail(props) {
    const [loading, setLoading] = useState(false);
    const details = useSelector(i => i.detail);//estado
    const dispatch = useDispatch();
    const {id} = props.match.params;
console.log(details)

    useEffect(() => {
        dispatch(getDetail(id))
        setLoading(true)
    }, [id,dispatch]);

    return (
      <div className="details" key={details.id} >
          {
            loading?
            <div className="allDetails">
                {
                    details && Object.keys(details).length > 0 ?
                    <div>
                        <h6 className='idDetails'>{details[0].id}</h6>
                        <h1 className='nameDetails'>{details[0].name}</h1>
                        <div>
                            <img className='imgDetails' src={details[0].image} alt='Pokemon'></img>
                            
                            <h1 className='typesD' >Types</h1>
                                {
                                    details[0].types.map(elem => elem.name)
                               } 
                               

                               
                          
                            <div>
                                <h1 className='stadistics'>Statistics</h1>
                                <h4>Life: {details[0].life}</h4>
                                <h4>Force: {details[0].force}</h4>
                                <h4>Defense: {details[0].defense}</h4>
                                <h4>Speed: {details[0].speed}</h4>
                             
                            </div>
                            
                           
                            <h3>Height: {details[0].height}</h3>
                            <h3>Weight: {details[0].weight}</h3>
                        </div>
                        
                    </div> : <div>Loading...</div>
                }
            </div> : <div>Loading...</div>
          }
        <Link to = "/home">
            <button>Volver</button>
            </Link> 
        </div>
    );
  };
    

   

  