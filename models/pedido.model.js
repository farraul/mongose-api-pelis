module.exports = mongoose => {
    const Pedido = mongoose.model(
      "pedidos",
      mongoose.Schema(
        {
          nombre_cliente: String,
          email_cliente: String,
          id_cliente: String,
          name_film: String,
          id_film: String,
          name_original_film: String,
          fecha_recogida: String,
      
        },
        { timestamps: true }
      )
    );
  
    return Pedido;
  };