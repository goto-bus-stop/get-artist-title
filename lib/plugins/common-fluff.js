function cleanTitle (title) {
  return title
    // Sub Pop includes "(not the video)" on audio tracks.
    // The " video" part might be stripped by other plugins.
    .replace(/\(not the( video)?\)\s*$/, '')
    .trim()
}

exports.cleanTitle = cleanTitle
