const db = require("../models");
const Pelicula = db.peliculas;

const PeliculaController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Pelicula
PeliculaController.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Pelicula
  const pelicula = new Pelicula({

    title: req.body.title,
    director: req.body.director,
    oscars: req.body.oscars,
    duration: req.body.duration,
    categoria: req.body.categoria,
    
  });

  // Save Pelicula in the database
  pelicula
    .save(pelicula)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve o recuperar all Movies from the database.
PeliculaController.findAll = (req, res) => {

  Pelicula.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single Pelicula with an id
PeliculaController.findOne = (req, res) => {
  const id = req.params.id;

  Pelicula.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Pelicula with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Pelicula with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Pelicula by the id in the request
PeliculaController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pelicula.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pelicula with id=${id}. Maybe Pelicula was not found!`
        });
      } else res.send({ message: "Pelicula was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pelicula with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Pelicula with the specified id in the request
PeliculaController.delete = (req, res) => {

  const id = req.params.id;

  Pelicula.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pelicula with id=${id}. Maybe Pelicula was not found!`
        });
      } else {
        res.send({
          message: "Pelicula was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pelicula with id=" + id
      });
    });
  
};


//-------------------------------------------------------------------------------------
// Delete all Movies from the database.
PeliculaController.deleteAll = (req, res) => {
    Pelicula.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Movies."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find all published Tutorials
PeliculaController.findAllAvailable = (req, res) => {
    Pelicula.find({ available: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    });
};



//encontrar una peli por titulo//

  PeliculaController.findBytitulo = (req, res) => {

    console.log("he entrado");
  const title = req.params.title;

  Pelicula.findOne({title: title})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No encontrada pelicula con titulo " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recibir pelicula con titulo=" + id });
    });
};

module.exports = PeliculaController;