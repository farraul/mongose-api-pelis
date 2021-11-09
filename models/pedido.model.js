module.exports = mongoose => {
    const Pedido = mongoose.model(
      "pedidos",
      mongoose.Schema(
        {
          nombre_cliente: String,
          email_cliente: String,
          fecha_recogida: String,
          fecha_entrega: String

        },
        { timestamps: true }
      )
    );
  
    return Pedido;
  };