module.exports = mongoose => {
    const Pelicula = mongoose.model(
      "peliculas",
      mongoose.Schema(
        {
          title: String,
          director: String,
          oscars: Number,
          duration: Number,
          categoria: String
          
        },
        { timestamps: true }
      )
    );
  
    return Pelicula;
  };