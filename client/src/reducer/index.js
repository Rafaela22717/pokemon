import  { GETPOKEMONS } from  "../actions/actionsIndex.js"  ;
import  { GETTYPES } from "../actions/actionsIndex.js"  ;
import  { POSTPOKEMON } from  "../actions/actionsIndex.js" ;
import  { FILTERCREATED } from  "../actions/actionsIndex.js" ;
import  { ORDERBYNAME } from   "../actions/actionsIndex.js" ;
import  { ORDERBYFORCE } from "../actions/actionsIndex.js" ;
import  { GETNAMEPOKEMON } from   "../actions/actionsIndex.js" ;
import  { GETDETAILS } from  "../actions/actionsIndex.js"  ;
import  { FILTERTYPE } from  "../actions/actionsIndex.js" ;



const initialState = {
     pokemons : [],
     allPokemons : [],
     types : [],
     detail: []
};

function reducer (state = initialState,action) {
switch(action.type) {
      case  GETPOKEMONS:
          return {
          ...state,
          pokemons: action.payload,//en mi estado pokemons[] manda todo lo q te mande la accion de pokemon
          allPokemons:action.payload
        }
      case  FILTERCREATED:  
      const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(el => el.createdInDb) : 
      state.allPokemons.filter(el => !el.createdInDb)
      console.log(createdFilter)
      return {
          ...state,
          pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
        };
      case ORDERBYNAME:
          let orderName = action.payload === "asc" ?
              state.pokemons.sort(function(a,b) {
                 if(a.name > b.name) {
                   return 1;
                 }
                 if(b.name > a.name ) {
                   return -1;
                 }
                 return 0;//los deja como esta
              }) :
              state.pokemons.sort(function (a,b) {
                 if(a.name > b.name) {
                   return -1;
                 }
                 if(b.name > a.name) {
                   return 1;
                 }
                   return 0;
              })
              return {
                ...state,
                pokemons:orderName 
              }
      case ORDERBYFORCE:
          let orderForce = action.payload === 'desc' ?
             state.pokemons.sort(function(a, b) {
               if(a.force > b.force) {
                return 1;
            }
               if(b.force > a.force) {
                return -1;
            }
             return 0;
        }) :
             state.pokemons.sort(function(a, b) {
                if(a.force > b.force) {
                 return -1;
            }
                if(b.force > a.force) {
                 return 1;
            }
                 return 0;
        });
                 return {
                    ...state,
                    pokemons: orderForce
        }

        case  GETNAMEPOKEMON:
               return {
                   ...state,
                   pokemons:action.payload//en pokemons pq es el componente q estoy renderizando

               }
        case  GETTYPES: 
            return {
                  ...state,
                  types:action.payload
            }  

        case POSTPOKEMON:
          return {
            ...state//devolveme el estado como esta pq lo creo en una ruta nueva
          }
        
        case GETDETAILS:
          return {
            ...state,
           detail:action.payload
          }  
      case FILTERTYPE:
        const allPokemons = state.allPokemons
        const typeFilter = action.payload === "allTypes" ? allPokemons : 
        allPokemons.filter(elem => {
          return elem.types.find(type => type.name === action.payload)
        })
          return {
            ...state,
           pokemons: typeFilter,
          
          }




         default:
           return state;
}
}

export default reducer;

