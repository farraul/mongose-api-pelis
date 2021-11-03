const express = require('express');
const router = express.Router();

//Importo Controllers
const peliculas = require("../controllers/pelicula.controller");
  
router.post("/", peliculas.create); // Create a new movie
router.get("/", peliculas.findAll); // Retrieve all peliculas
router.get("/available", peliculas.findAllAvailable); // Retrieve all available peliculas
router.get("/:id", peliculas.findOne); // Retrieve a single movie with id
router.put("/:id", peliculas.update); // Update a movie with id
router.delete("/:id", peliculas.delete); // Delete a movie with id
router.delete("/", peliculas.deleteAll); // Create a new movie
router.get("/title/:title", peliculas.findBytitulo);//buscar una peli por titulo
  

module.exports = router;