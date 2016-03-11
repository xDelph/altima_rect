var path = require('path');

module.exports = {
  context: path.join(__dirname, 'js'), // Détermine le répertoire de travail
  entry: "./entry.js", // Point d'entrée, relatif au répertoire de travail
  output: {
    path: path.join(__dirname, 'build'), // Où poser le fichier final
    filename: 'bundle.js' // Nom du fichier final
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // On prend tous les fichiers .js ou .jsx
        exclude: /node_modules/,
        loader: 'babel', // On applique le loader babel
        query: {
          // Arguments passés à babel https://babeljs.io/docs/plugins/
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
}