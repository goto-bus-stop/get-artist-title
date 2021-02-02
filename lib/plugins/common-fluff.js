/* eslint-disable no-var */
'use strict'

var mapTitle = require('../core').mapTitle

function cleanTitle (title) {
  return title
    // Sub Pop includes "(not the video)" on audio tracks.
    // The " video" part might be stripped by other plugins.
    .replace(/\(not the( video)?\)\s*$/, '')
    // remove (audio) from title -> https://www.youtube.com/watch?v=vyrFeUsO59E
    .replace(/\(audio\)\s*$/i, '')
    // Lyrics videos
    .replace(/(\s*[-~_/]\s*)?\b(with\s+)?lyrics\s*/i, '')
    .replace(/\(\s*(with\s+)?lyrics\s*\)\s*/i, '')
    .trim()
}

exports.after = mapTitle(cleanTitle)
