const { dependencies } = require('../package.json')

module.exports = {
  ...dependencies,

  react: {
    singleton: true,
    requiredVersion: dependencies.react,
  },

  "react-dom": {
    singleton: true,
    requiredVersion: dependencies["react-dom"],
  },
}