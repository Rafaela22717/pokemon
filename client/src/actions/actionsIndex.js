import axios from "axios"
export const GETPOKEMONS = "GET_POKEMONS";
export const GETTYPES = "GET_TYPES";
export const POSTPOKEMON = "POST_POKEMON";
export const FILTERCREATED = "FILTER_CREATED";
export const ORDERBYNAME = "ORDER_BY_NAME";
export const ORDERBYFORCE = "ORDER_BY_FORCE";
export const GETNAMEPOKEMON = "GET_NAME_POKEMON";
export const GETDETAILS = "GET_DETAILS";
export const FILTERTYPE ="FILTER_TYPE" ;




//funcion para traer todos los personajes
export  function getPokemons (){
return async function(dispatch) {
var res = await axios.get("http://localhost:3001/pokemons")//conexion entre front y back

 dispatch({
type: GETPOKEMONS,
payload:res.data
});
};
};

export function getTypes() {//despacha la ruta del back q trae los tipos
return async function (dispatch) {
    let info = await axios.get("http://localhost:3001/types", { //solo trae el name de los tipos pq lo filtre en back
    });
    return dispatch({
type:GETTYPES,
payload:info.data
    });
};
}

export function postPokemon(payload) {//paso el payload pq esta accion no viene vacia
    return async function () {
    const data = await axios.post("http://localhost:3001/pokemon",payload);//dispara una ruta de post pq quiero crear poke
  
    return {
        type:POSTPOKEMON,
        data
    }
    }
}

export function filterCreated(payload) {
    return {
        type: FILTERCREATED,
        payload
    };
};

export function orderByName(payload) {
    return {
        type:ORDERBYNAME,
        payload 
    }
};

export function orderByForce(payload) {
    return {
        type: ORDERBYFORCE,
        payload
    }
}

export function getNamePokemons(name) {//name es lo q el usuario escribe/search
     return async function (dispatch) {
         try {
             let resp = await axios.get(`http://localhost:3001/pokemons?name=${name}`);// la ruta del back + el name q le llega por payload 
             return dispatch({
              type:GETNAMEPOKEMON,
              payload:resp.data//me devuelve la accion de la 40 por name

             }) 
            } catch (error) {
                console.log(error)
            };
            };
     };
     export function getDetail(id) {
        return async function (dispatch) {
            try {
               let resp = await axios.get(`http://localhost:3001/pokemons/${id}`);
               return dispatch({
               type:GETDETAILS,
               payload:resp.data
               })
            } catch(error){
                console.log(error);
            }
        } 
     }
     export function filterType(payload) {
        return {
            type:FILTERTYPE,
            payload 
        }
    };
     
    
