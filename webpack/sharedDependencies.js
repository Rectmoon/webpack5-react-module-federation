const { dependencies } = require('../package.json')

module.exports = {
  react: {
    requiredVersion: dependencies.react,
    import: 'react', // the "react" package will be used a provided and fallback module
    shareKey: 'react', // under this name the shared module will be placed in the share scope
    shareScope: 'default', // share scope with this name will be used
    singleton: true // only a single version of the shared module is allowed
  },
  'react-dom': {
    requiredVersion: dependencies['react-dom'],
    singleton: true // only a single version of the shared module is allowed
  },
  'react-router-dom': {
    requiredVersion: dependencies['react-router-dom'],
    singleton: true
  }
}
