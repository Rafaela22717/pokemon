const axios = require("axios");
const { Pokemon, Type } = require("../db");
require('dotenv').config();

//https://pokeapi.co/api/v2/pokemon
//https://pokeapi.co/api/v2/pokemon/{id}
//https://pokeapi.co/api/v2/pokemon/{name}

const getInfoApi = async () => {
  //const pokemons = [];
  try {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
  const promises =  data.results.map(elem => axios.get(elem.url)) 
  const allResponse = await Promise.all(promises)
  const pokemons = allResponse.map(all => {
    return {
      id: all.data.id,
      name: all.data.name,
      image: all.data.sprites.other.dream_world.front_default,
      life: all.data.stats[0].base_stat,
      force: all.data.stats[1].base_stat,
      defense: all.data.stats[2].base_stat,
      speed: all.data.stats[5].base_stat,
      height: all.data.height,
      weight: all.data.weight,
      types: all.data.types.map((el) => {
        return { name: el.type.name };
      }),
     }
  })
  return pokemons;
    } catch(error){
      console.log(error)
    }
};

//GET/pokemons funcion q me trae la info de la base de datos
const getInfoDb = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
          attributes: []
      }
  }
});
}
    
//concateno las 2 funciones/me trae todo
const getAllPokemons = async () => {
  const api = await getInfoApi();
  const db = await getInfoDb();
  const infoDeAmbas = db.concat(api);
  console.log(infoDeAmbas)
  return infoDeAmbas;
}
//por nombre
const getPokemons = async (req, res) => {
  const name = req.query.name;
  const pokemons = await getAllPokemons();
  if (name) {
   const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
   .then(response=>{
     return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      life: response.data.stats[0].base_stat,
      force: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      speed: response.data.stats[5].base_stat,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map((el) => {
        return { name: el.type.name };
      }),
    }
  })
   .catch(error=>console.log(error))
    const db = await getInfoDb();

    const dbResults =  db.filter(elem => elem.name.toLowerCase().includes(name.toLowerCase()))
    const pokemonsName  = api ? dbResults.concat(api):dbResults
    pokemonsName.length ?
      res.status(200).send(pokemonsName) :
      res.status(404).send("No se encontro el pokemon solicitado");
  } else {
    res.status(200).send(pokemons);
  };
};

//GET Poke/ID
const getPokemonsId = async (req, res) => {
  const { id } = req.params;
  const pokemons = await getAllPokemons()
  if (id) {
    let pokemonsId = await pokemons.filter(elem => elem.id == id)
    pokemonsId.length ?
      res.status(200).json(pokemonsId) : res.status(404).send("Pokemon no encontrado")

  }
}

//POST /pokemon:
const addPokemon = async (req, res) => {
  const {
    name,
    life,
    force,
    defense,
    speed,
    height,
    weight,
    createdInDb,
    type
  } = req.body;
  
    const createdPokemon = await Pokemon.create({
      name,
      life,
      force,
      defense,
      speed,
      height,
      weight,
      image: "https://www.kindpng.com/picc/m/107-1075263_transparent-pokeball-png-pokemon-ball-2d-png-download.png",
      createdInDb
    });

    const createdDb = await Type.findAll({//lo traigo de mi modelo
      where: {
          name: type
      }
  });


     createdPokemon.addType(createdDb);// crea la tabl interm
    console.log(createdPokemon)//cin los id de ambos llena la intermed

    return res.status(200).send("Pokemon created successfully");
  
  }







module.exports = {
  getAllPokemons,
  addPokemon,
  getPokemons,
  getPokemonsId,

}