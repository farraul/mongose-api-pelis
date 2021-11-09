module.exports = mongoose => {
    const Pedido = mongoose.model(
      "pedidos",
      mongoose.Schema(
        {
          nombre_cliente: String,
          email_cliente: String,
          id_film: String,
          name_film: String,
          name_original_film: String,
          fecha_recogida: String
      


        },
        { timestamps: true }
      )
    );
  
    return Pedido;
  };