
const {Type} = require("../db");
require('dotenv').config();
const axios= require ("axios")

//GET https://pokeapi.co/api/v2/type

//GET/Types

const getTypes =  async(req, res) => {
  const {data} = await axios.get('https://pokeapi.co/api/v2/type')
  const types = data.results
  for(var i = 0; i < types.length; i++) {
      await Type.findOrCreate({//guardo types en modelo
          where: {
              name: types[i].name
          }
      })
  }
  const allTypes = await Type.findAll()
  console.log(allTypes)
  return res.status(200).send(allTypes)
}; 



















 
  
  module.exports = {
    getTypes 
  }