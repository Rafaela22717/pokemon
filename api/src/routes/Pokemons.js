const express= require("express");
const router= express.Router();
const{getAllPokemons,addPokemon,getPokemons,getPokemonsId} = require ("../Controllers/PokemonController.js");



router.post('/pokemon', addPokemon) 
router.get('/pokemons', getPokemons,getAllPokemons) 
router.get('/pokemons/:id',getPokemonsId) 




module.exports=router;