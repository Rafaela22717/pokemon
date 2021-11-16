const express= require("express");
const router= express.Router();
const{getTypes} = require ("../Controllers/TypesController.js");


router.get('/types', getTypes)  











module.exports=router;