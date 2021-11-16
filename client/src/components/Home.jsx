import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //hooks
import {
  getPokemons,
  filterCreated,
  orderByName,
  orderByForce,
  filterType,
  getTypes,
} from "../actions/actionsIndex.js";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../Styles.css/Home.css"


export default function Home() {
  const dispatch = useDispatch(); //para despachar las acciones/lo declaro
  const allPokemons = useSelector((state) => state.pokemons); //con useSelector trae lo q esta en el estado de perros
  const [order, setOrden] = useState(""); //estado local vacio
  const [force, setForce] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //pag actual
  const [pokemonsPerPage] = useState(9); //pokemons por pagina12
  const indexOfLastPokemon = currentPage * pokemonsPerPage; //indice del ultim pokemon9
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0indice del primer personaje
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon//no me toma el
  );
  const types = useSelector((state) => state.types);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
//me llena el estado cuando se monta el componente//le indica a react que el componente haga algo luego derenderizarse
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]); //ejecutalo siempre y cuando suceda esto//ejecutate siempre q suceda un dispacht/depende

  function handleClick(e) {
    e.preventDefault(); //para q no se recargue la pag/preventivo
    dispatch(getPokemons()); //me resetea los personajes
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value)); //viene por payload
  }
  function handleOrderSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value)); //despacho la accion
    setOrden(`Ordenado ${e.target.value}`); //estado q me setea la pagina en 1/lo seteo ordenado d tal forma
  }
  function handleForceSort(e) {
    e.preventDefault();
    dispatch(orderByForce(e.target.value));
    //setCurrentPage(1);
    setForce(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e) {
    dispatch(filterType(e.target.value));
  }

  return (
    <div className="fondoHome" >

    <div>
      <Link to="/pokemon">Crear Pokemon</Link>
      <h1 className="titulo">POKEMON TU API</h1>
      <button onClick={(e) => { handleClick(e)  }} >
        Volver a cargar los pokemons
      </button>

      <div>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All Pokes</option>
          <option value="Created">My poke</option>
          <option value="Api">Api Pokes</option>
        </select>

        {/* ordenamiento: */}
        <div className="filtrosBotones">
        <h5 className="marginBoton">By Order</h5>
        {/* //name */}
        <select onChange={(e) => handleOrderSort(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        </div>
        {/* por fuerza */}
        <div className="filtrosBotones">
        <h5 className="marginBoton">By force</h5>
        <select onChange={(e) => handleForceSort(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
          </div>
          <div className="filtrosBotones">
        <select onChange={(e) => handleFilterType(e)}>
          <option value="allTypes">All Types</option>
          {types?.map((elem) => (
            <option key={elem.id} value={elem.name}>
              {elem.name}
            </option>
          ))}
        </select>
          </div>
          </div>

         
        <SearchBar />
          
        </div>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
       <div className="parteCard">

        {currentPokemons?.map((el) => {
          //este compon se trajo el estado global ,lo mapeo y le paso lo de la card
          return (
            <div  className="card" key={el.id}>
              <Link to={"/detail/" + el.id} style={{ textDecoration: 'none' }}>
                <Card
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  type={el.type || el.types}
                  />
              </Link>
            </div>
          );
          
        })}
          </div>
    </div>
  );
}
