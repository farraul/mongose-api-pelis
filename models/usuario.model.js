module.exports = mongoose => {
    const Usuario = mongoose.model(
      "usuarios",
      mongoose.Schema(
        {
       
          email: String,
          password: String

         
        },
        { timestamps: true }
      )
    );
    return Usuario;
  };