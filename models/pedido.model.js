module.exports = mongoose => {
    const Pedido = mongoose.model(
      "pedidos",
      mongoose.Schema(
        {
          numero: String,
          dependiente: String,
          fecha_recogida: String,
          fecha_entrega: String
        },
        { timestamps: true }
      )
    );
  
    return Pedido;
  };