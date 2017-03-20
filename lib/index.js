var removeFileExtensionPlugin = require('./plugins/remove-file-extension')
var basePlugin = require('./plugins/base')
var quotedTitlePlugin = require('./plugins/quoted-title')
var cleanFluffPlugin = require('./plugins/common-fluff')

var core = require('./core')

function getArtistTitle (str, options) {
  return core.getArtistTitle(str, options, [
    removeFileExtensionPlugin,
    basePlugin,
    quotedTitlePlugin,
    cleanFluffPlugin
  ])
}

getArtistTitle.fallBackToArtist = require('./fallBackToArtist')
getArtistTitle.fallBackToTitle = require('./fallBackToTitle')

module.exports = getArtistTitle
