const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.peliculas = require("./pelicula.model.js")(mongoose);
db.pedidos = require("./pedido.model.js")(mongoose);
db.usuarios = require("./usuario.model.js")(mongoose);

module.exports = db;