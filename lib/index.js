var flow = require('lodash.flow')

function flowArray (functions) {
  return flow.apply(null, functions)
}

// Return the result of the first splitter function that matches.
function combineSplitters (splitters) {
  var l = splitters.length
  return function (str) {
    for (var i = 0; i < l; i++) {
      var result = splitters[i](str)
      if (result) return result
    }
  }
}

// Combine multiple plugins into a single plugin.
function reducePlugins (plugins) {
  var splitArtistTitle = []
  var mapArtistTitle = []
  var cleanArtist = []
  var cleanTitle = []
  plugins.forEach(function (plugin) {
    // Resolve builtin plugins by name.
    if (typeof plugin === 'string') {
      plugin = require('./plugins')[plugin]
    }

    if (plugin.splitArtistTitle) splitArtistTitle.push(plugin.splitArtistTitle)
    if (plugin.mapArtistTitle) mapArtistTitle.push(plugin.mapArtistTitle)
    if (plugin.cleanArtist) cleanArtist.push(plugin.cleanArtist)
    if (plugin.cleanTitle) cleanTitle.push(plugin.cleanTitle)
  })
  return {
    splitArtistTitle: combineSplitters(splitArtistTitle),
    mapArtistTitle: flowArray(mapArtistTitle),
    cleanArtist: flowArray(cleanArtist),
    cleanTitle: flowArray(cleanTitle)
  }
}

// Helpful-ish plugin checks
function checkPlugin (plugin) {
  if (plugin.splitArtistTitle.length === 0) {
    throw new Error('no splitArtistTitle function was specified by any plugin')
  }
}

function combineArtistTitleCleaners (cleanArtist, cleanTitle) {
  return function cleanArtistTitle (parts) {
    return [ cleanArtist(parts[0]), cleanTitle(parts[1]) ]
  }
}

function getSongArtistTitle (str, plugins) {
  if (!Array.isArray(plugins) || plugins.length === 0) {
    plugins = [ 'base' ]
  }

  var plugin = reducePlugins(plugins)

  checkPlugin(plugin)

  var clean = combineArtistTitleCleaners(plugin.cleanArtist, plugin.cleanTitle)

  var parts = plugin.splitArtistTitle(str)
  if (!parts) return
  return clean(plugin.mapArtistTitle(parts))
}

exports = module.exports = getSongArtistTitle
exports.combineSplitters = combineSplitters
exports.combineCleaners = flowArray
exports.combineArtistTitleCleaners = combineArtistTitleCleaners
exports.combinePlugins = reducePlugins
