const db = require("../models");
const Usuario = db.usuarios;

const UsuarioController = {}; //Create the object controller


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
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

 Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
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



UsuarioController.signUp = (req, res) => {
  if (req.user.usuario.rol == "admin") {//COMPROBAMOS SI ESTÁ LOGADO COMO ADMINISTRADOR
        let clave = req.body.clave;
        if (clave.length >= 8) {//SE ENCRIPTA LA CONTRASEÑA SI MÍNIMO TIENE 8 CARACTERES
          var contrasena = bcrypt.hashSync(req.body.contrasena, Number.parseInt(authConfig.rounds));  
          usuario.create({
              nombre: req.body.nombre,
              email: req.body.email,
              contrasena: contrasena,
              rol: req.body.email
          }).then(usuario => {
              let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                  expiresIn: authConfig.expires
              });
              res.json({
                  usuario: usuario,
                  token: token
              });
          }).catch(err => {
              res.status(500).json(err);
          });
        }else{
          res.send({
            message: `La contraseña tiene que tener un mínimo de 8 caracteres. ${clave}`
        });
        }
  }else{
    res.send({
      message: `No tienes permisos para registrar usuarios. Contacta con un administrador.`
    });
  }
};






module.exports = UsuarioController;


