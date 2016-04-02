var combinePlugins = require('../').combinePlugins

var separators = [ ' -- ', '--', ' - ', ' – ', ' — ', '-', '–', '—', ':', '|', '///' ]

function splitArtistTitle (str) {
  for (var i = 0, l = separators.length; i < l; i++) {
    var sep = separators[i]
    var idx = str.indexOf(sep)
    if (idx > -1) {
      return [ str.slice(0, idx), str.slice(idx + sep.length) ]
    }
  }
}

// Most of this is taken from the YouTube connector in David Šabata's Last.fm
// web scrobbler: https://github.com/david-sabata/web-scrobbler

function cleanTitleWebScrobbler (title) {
  return title.trim()
    .replace(/\s*\*+\s?\S+\s?\*+$/, '') // **NEW**
    .replace(/\s*\[[^\]]+\]$/, '') // [whatever]
    .replace(/\s*\[\s*(M\/?V)\s*\]/, '') // [MV] or [M/V]
    .replace(/\s*\(\s*(M\/?V)\s*\)/, '') // (MV) or (M/V)
    .replace(/[\s\-–_]+(M\/?V)\s*/, '') // MV or M/V
    .replace(/\s*\([^\)]*\bver(\.|sion)?\s*\)$/i, '') // (whatever version)
    .replace(/\s*[a-z]*\s*\bver(\.|sion)?$/i, '') // ver. and 1 word before (no parens)
    .replace(/\s*(of+icial\s*)?(music\s*)?video/i, '') // (official)? (music)? video
    .replace(/\s*(ALBUM TRACK\s*)?(album track\s*)/i, '') // (ALBUM TRACK)
    .replace(/\s*\(\s*of+icial\s*\)/i, '') // (official)
    .replace(/\s*\(\s*[0-9]{4}\s*\)/i, '') // (1999)
    .replace(/\s+\(\s*(HD|HQ)\s*\)$/, '') // HD (HQ)
    .replace(/[\s\-–_]+(HD|HQ)\s*$/, '') // HD (HQ)
    .replace(/\s*video\s*clip/i, '') // video clip
    .replace(/\s+\(?live\)?$/i, '') // live
    .replace(/\(\s*\)/, '') // Leftovers after e.g. (official video)
    .replace(/^(|.*\s)"(.*)"(\s.*|)$/, '$2') // Artist - The new "Track title" featuring someone
    .replace(/^(|.*\s)'(.*)'(\s.*|)$/, '$2') // 'Track title'
    .replace(/^[\/\s,:;~\-–_\s"]+/, '') // trim starting white chars and dash
    .replace(/[\/\s,:;~\-–_\s"]+$/, '') // trim trailing white chars and dash
}

function cleanArtistWebScrobbler (artist) {
  return artist.trim()
    .replace(/\s*[0-1][0-9][0-1][0-9][0-3][0-9]\s*/, '') // date formats ex. 130624
    .replace(/\[\s*(1080|720)p\s*\]/i, '') // [1080p]
    .replace(/\[\s*(M\/?V)\s*\]/, '') // [MV] or [M/V]
    .replace(/\(\s*(M\/?V)\s*\)/, '') // (MV) or (M/V)
    .replace(/\s*(M\/?V)\s*/, '') // MV or M/V
    .replace(/^[\/\s,:;~\-–_\s"]+/, '') // trim starting white chars and dash
    .replace(/[\/\s,:;~\-–_\s"]+$/, '') // trim trailing white chars and dash
}

exports.separators = separators
var plugin = combinePlugins([
  require('./remove-file-extension'),
  { splitArtistTitle: splitArtistTitle,
    cleanTitle: cleanTitleWebScrobbler,
    cleanArtist: cleanArtistWebScrobbler },
  require('./common-fluff')
])
exports.splitArtistTitle = plugin.splitArtistTitle
exports.cleanTitle = plugin.cleanTitle
exports.cleanArtist = plugin.cleanArtist
