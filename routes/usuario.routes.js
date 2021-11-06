const express = require('express');
const router = express.Router();

//Importo Controllers
const usuarios = require("../controllers/usuarios.controller");
  
router.post("/", usuarios.create); // Create a new category
router.get("/", usuarios.findAll); // Retrieve all usuarios
router.get("/:id", usuarios.findOne); // Retrieve a single category with id
/*router.put("/:id", usuarios.update); // Update a category with id*/
router.put("/:id", usuarios.update); // Update a category with id
router.delete("/:id", usuarios.delete); // Delete a category with id
router.delete("/", usuarios.deleteAll); // Create a new category

// Dos rutas: login y registro
// /api/singin & /api/singup
router.post('/signin', usuarios.signIn);
router.post('/signup', usuarios.signUp);

  

module.exports = router;