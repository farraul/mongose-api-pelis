module.exports = mongoose => {
    const Usuario = mongoose.model(
      "usuarios",
      mongoose.Schema(
        {
          name: String,
          email: String,
          password: String,
          telf: String,
          rol: String,

         
        },
        { timestamps: true }
      )
    );
    return Usuario;
  };
