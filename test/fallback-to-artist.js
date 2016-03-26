var fallBackToArtist = require('../').fallBackToArtist

module.exports = {
  plugins: [ 'base', fallBackToArtist('Artist') ],
  tests: [
    { input: 'Title',
      expected: [ 'Artist', 'Title' ] }
  ]
}
