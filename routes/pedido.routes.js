const express = require('express');
const router = express.Router();

//Importo Controllers
const pedidos = require("../controllers/pedidos.controller");
  
router.post("/", pedidos.create); // Create a new category
router.get("/", pedidos.findAll); // Retrieve all pedidos
router.get("/:id", pedidos.findOne); // Retrieve a single category with id
router.put("/:id", pedidos.update); // Update a category with id
router.delete("/:id", pedidos.delete); // Delete a category with id
router.delete("/", pedidos.deleteAll); // Create a new category
  

module.exports = router;