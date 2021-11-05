module.exports = mongoose => {
    const Usuario = mongoose.model(
      "usuarios",
      mongoose.Schema(
        {
          name: String,
          email: String,
          password: String,
          telf: String,

         
        },
        { timestamps: true }
      )
    );
    return Usuario;
  };
