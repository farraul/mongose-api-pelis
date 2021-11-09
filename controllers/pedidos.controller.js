const { red } = require("colors");
const db = require("../models");
const Pedido = db.pedidos;

const PedidoController = {}; //Create the object controller

//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Pedido
PedidoController.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Pedido
  const pedido = new Pedido({
    nombre_cliente: req.body.nombre_cliente,
    email_cliente: req.body.email_cliente,
    id_film: req.body.id_film,
    name_film: req.body.name_film,
    name_original_film: req.body.name_original_film,
    fecha_recogida: req.body.fecha_recogida,
   


  });

  // Save pedido in the database
  pedido
    .save(pedido)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pedido."
      });
    });
};


//-------------------------------------------------------------------------------------
// Retrieve all categories from the database.
PedidoController.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Pedido.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};


//-------------------------------------------------------------------------------------
// Find a single pedido with an id
PedidoController.findOne = (req, res) => {
  const id = req.params.id;

  Pedido.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found pedido with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving pedido with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Pedido by the id in the request
PedidoController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Pedido.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pedido with id=${id}. Maybe Pedido was not found!`
        });
      } else res.send({ message: "Pedido was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pedido with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Pedido with the specified id in the request
PedidoController.delete = (req, res) => {
  const id = req.params.id;

  Pedido.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pedido with id=${id}. Maybe Pedido was not found!`
        });
      } else {
        res.send({
          message: "Pedido was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pedido with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all Categories from the database.
PedidoController.deleteAll = (req, res) => {
    Pedido.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pedido were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pedido."
      });
    });
};



module.exports = PedidoController;