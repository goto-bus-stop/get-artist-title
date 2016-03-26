var fallBackToTitle = require('../').fallBackToTitle

module.exports = {
  plugins: [ 'base', fallBackToTitle('Title') ],
  tests: [
    { input: 'Artist',
      expected: [ 'Artist', 'Title' ] }
  ]
}
