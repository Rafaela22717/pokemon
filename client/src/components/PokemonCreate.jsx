import React, {useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {postPokemon,getTypes} from "../actions/actionsIndex.js"
import { useDispatch,useSelector } from "react-redux";
import "../Styles.css/PokemonCreate.css";

//control de errores formulario
function validate(input) {
  let errors = {};
if (!input.name) {//si en mi estado local.name no hay nada creo un objeto q diga el error
  errors.name = "Name is required";
} else if (!input.life){
  errors.life = "Life is required ";
} else if(!input.force) {
  errors.force = "Force is required";
} else if(!input.defense) {
  errors.defense = "Defense es required";
} else if(!input.speed) {
  errors.speed = "Speed is required";
} else if (input.height) {
  errors.height = "Eight is required";
} else if(input.weight) {
  errors.weight = "Weight is required";
} 
return errors;
};


export default function PokemonCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state)=> state.types)//me traigo los types
    const [errors,setErrors] = useState({});


    const [input,setInput] = useState({//guardo el formulario en un estado input//pongo todo lo q necesita el post 
        name: '',
        life: '',
        force: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: []                        //pq quiero q se cree mas de 1       
    })
    
       useEffect(()=> {//para q se renderice getTypes
       dispatch(getTypes());
       }, [dispatch]);

       function handleChange(e) {//c vez q ejecuto esta func a mi estado input ademas d lo q tiene agregale el target value de lo q este cambiando
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
        setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
        }))
        console.log(input)
       }
       function handleSelect(e) {
        setInput({
             ...input,
             type:[...input.type,e.target.value]//traeme lo q habia y concatenale el target//guarda en un arreglo lo q guarde en el select
        })
       }
       function handleSubmit(e) {
            e.preventDefault();
            console.log(input)
            if(Object.keys(errors).length) {
              dispatch(postPokemon(input));
              alert("Pokemon creado exitosamente"); 
              setInput({
                  name: '',
                  life: '',
                  force: '',
                  defense: '',
                  speed: '',
                  height: '',
                  weight: '',
                  type: []
              })
            } else {
              alert("Complete todos los campos");
            }
            history.push("/home");
       }


     return (
           <div className="createPokes"> 
            <Link to="/home"><button className='back'>Volver</button></Link>{/* //boton para regresar de formul a home */}
            <h1>Crea tu pokemon</h1>
            <form className='createForm'  onSubmit={e => {handleSubmit(e)}}>
              <div  className='labels'>
                <label>Nombre:</label>
              </div>  
              <input className='box' type='text' value={input.name} name='name' required
                 onChange={e => handleChange(e)}>  
              </input>
              {errors.name && (
              <h5>{errors.name}</h5>) }
              
              <div className='labels'>
                <label>Life:</label>
             </div>  
              <input  className='box' type='number' value={input.life} name='life' required 
                 onChange={e => handleChange(e)}>  
              </input>
              {errors.life && (
              <h5>{errors.life}</h5>) }
             <div className='labels'>
               <label>Force:</label>
             </div>  
              <input className='box' type='number' value={input.force} name='force' required
                 onChange={e => handleChange(e)}>  
              </input>
              {errors.force && (
              <h5>{errors.force}</h5>) }
             <div className='labels'>
               <label>Defense:</label>
             </div >  
              <input  className='box' type='number' value={input.defense} name='defense' required
                 onChange={e => handleChange(e)}>  
              </input>
              {errors.defense && (
              <h5>{errors.defense}</h5>) }
              
              <div className='labels' >
               <label>Speed:</label>
              </div>  
               <input className='box' type='number' value={input.speed} name='speed' required
                 onChange={e => handleChange(e)}>  
               </input>
               {errors.speed && (
              <h5>{errors.speed}</h5>) }
              <div className='labels' >
               <label>Height:</label>
              </div>  
               <input className='box' type='number' value={input.height} name='height' required
                 onChange={e => handleChange(e)}>  
               </input>
               {errors.height && (
              <h5>{errors.height}</h5>) }
              <div  className='labels' >
               <label>Weight:</label>
              </div>  
               <input className='box' type='number' value={input.weight} name='weight' required
                 onChange={e => handleChange(e)}>  
               </input> 
               {errors.weight && (
              <h5>{errors.weight}</h5>) }    
              <div> 
               <select  onChange={e => handleSelect(e)}>
          {
            types?.map(i => (
              <option key={i.id} value={i.name}>{i.name}</option>
              
              ))
            }
            <ul>
              <li>{input.type.map(i => i.name + ", ")}</li>
            </ul>
        </select>
        <div>
            </div>        
          <button  type='submit'>Crear Pokemon</button>  
        </div>
      </form>      


           </div>

     )
}