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

// Collect plugin methods into separate arrays.
function reducePlugins (plugins) {
  var o = {
    splitArtistTitle: [],
    mapArtistTitle: [],
    cleanArtist: [],
    cleanTitle: []
  }
  plugins.forEach(function (plugin) {
    // Resolve builtin plugins by name.
    if (typeof plugin === 'string') {
      plugin = require('./plugins')[plugin]
    }

    if (plugin.splitArtistTitle) o.splitArtistTitle.push(plugin.splitArtistTitle)
    if (plugin.mapArtistTitle) o.mapArtistTitle.push(plugin.mapArtistTitle)
    if (plugin.cleanArtist) o.cleanArtist.push(plugin.cleanArtist)
    if (plugin.cleanTitle) o.cleanTitle.push(plugin.cleanTitle)
  })
  return o
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

  var splitArtistTitle = combineSplitters(plugin.splitArtistTitle)
  var cleanArtist = flowArray(plugin.cleanArtist)
  var cleanTitle = flowArray(plugin.cleanTitle)
  var clean = combineArtistTitleCleaners(cleanArtist, cleanTitle)

  var mapArtistTitle = flowArray(
    plugin.mapArtistTitle.concat(clean)
  )

  var parts = splitArtistTitle(str)
  if (!parts) return
  parts = mapArtistTitle(parts)
  if (!parts) return

  return [ cleanArtist(parts[0]), cleanTitle(parts[1]) ]
}

exports = module.exports = getSongArtistTitle
exports.combineSplitters = combineSplitters
exports.combineCleaners = flowArray
exports.combineArtistTitleCleaners = combineArtistTitleCleaners
