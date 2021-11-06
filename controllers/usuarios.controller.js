const db = require("../models");
const Usuario = db.usuarios;

const UsuarioController = {}; //Create the object controller


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');




//CRUD end-points Functions
//-------------------------------------------------------------------------------------
// Create and Save a new Category
UsuarioController.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Category
  const usuario = new Usuario({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    pais: req.body.pais,
    telf: req.body.telf,
    pack: req.body.pack


  
  });

  // Save category in the database
  usuario
    .save(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};

//-------------------------------------------------------------------------------------
// Retrieve all categories from the database.
UsuarioController.findAll = (req, res) => {
  
 Usuario.find()
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
// Find a single category with an id
UsuarioController.findOne = (req, res) => {
  const id = req.params.id;

 Usuario.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found category with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving category with id=" + id });
    });
};


//-------------------------------------------------------------------------------------
// Update a Category by the id in the request
UsuarioController.update = (req, res) => {
  //res.send("entre73")
 
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

//  const id = req.params.id;
const id = req.body.email;

//Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
 Usuario.findIdAndUpdate(email, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          //message: `Cannot update Category with id=${id}. Maybe Category was not found!`
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch(err => {
      console.log("entra al cath");
      res.status(500).send({
        //message: "Error updating Category with id=" + id
        message: "Error updating Category with id=" +id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete a Category with the specified id in the request
UsuarioController.delete = (req, res) => {
  const id = req.params.id;

 Usuario.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      } else {
        res.send({
          message: "Category was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
// Delete all Categories from the database.
UsuarioController.deleteAll = (req, res) => {
   Usuario.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Category were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Category."
      });
    });
};

//------------------ crear Usuario//

UsuarioController.signUp = (req, res) => {
  
// Encriptamos la contraseña
let contrasenanew = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

// Crear un usuario
Usuario.create({
  name: req.body.name,
  email: req.body.email,
  password: contrasenanew,
  telf: req.body.telf,
}).then(user => {

    // Creamos el token
    let token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires
    });

    res.json({
        user: user,
        token: token
    });

}).catch(err => {
    res.status(500).json(err);
});

};


//-------------------------------------------------------------------------------------
//Login Usuario with database
//get Usuario
UsuarioController.signIn = (req, res) =>{
  let { email, password } = req.body;
  // Buscar usuario
  Usuario.findOne({ email: email }
  ).then(Usuario => {
      if (!Usuario) {
          res.status(404).json({ msg: "Usuario con este correo no encontrado" });
      } else {
          if (bcrypt.compareSync(password, Usuario.password)) {
              // Creamos el token
              let token = jwt.sign({ Usuario: Usuario }, authConfig.secret, {
                  expiresIn: authConfig.expires
              });

              res.json({
                  texto:"Te has conectado",
                  Usuario: Usuario,
                  token: token
              
              })
          } else {
              // Unauthorized Access
              res.status(401).json({ msg: "Contraseña incorrecta" })
          }
      }
  }).catch(err => {
      res.status(500).json(err);
  })
};





module.exports = UsuarioController;


