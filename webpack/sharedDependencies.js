const { dependencies } = require('../package.json')

module.exports = {
  ...dependencies,
  react: {
    eager: true,
    singleton: true,
    requiredVersion: dependencies.react,
  },
  "react-dom": {
    eager: true,
    singleton: true,
    requiredVersion: dependencies["react-dom"],
  },
}