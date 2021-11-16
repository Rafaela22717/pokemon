const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 const PokemonsRoutes= require('./Pokemons.js'); 
 const TypesRoutes = require('./TypesPokemons.js');  


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/',PokemonsRoutes);
router.use('/',TypesRoutes  ); 



module.exports = router;
