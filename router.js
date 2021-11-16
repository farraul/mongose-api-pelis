const router = require('express').Router();

// Middlewares
const auth = require('./middlewares/auth');

//Importamos Routes definidas en views
const PeliculaRouter = require('./routes/pelicula.routes');
const PedidoRouter = require('./routes/pedido.routes');
const UsuarioRouter = require('./routes/usuario.routes');


//Rutas
router.use('/pelicula', auth,  PeliculaRouter);
router.use('/pedido', auth,PedidoRouter);
router.use('/usuario', UsuarioRouter);
router.use('/api', UsuarioRouter); 



module.exports = router;