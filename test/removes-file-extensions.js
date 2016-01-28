module.exports = {
  tests: [
    // https://youtu.be/A2RwHnfI2y8
    { input: 'Ga-In (가인) - Nostalgia (노스텔지아) - Lyrics [Hangul+Translation] .mov',
      expected: [ 'Ga-In (가인)', 'Nostalgia (노스텔지아)' ],
      // Will be non-optional once the base plugin is split up into more testable chunks.
      optional: true },
    // https://www.youtube.com/watch?v=PYBuIwuD1DA
    { input: 'show me - B-free.m4v',
      expected: [ 'show me', 'B-free' ] },
    // https://www.youtube.com/watch?v=5hINYNZslP0
    { input: '성시경 Sung Si Kyung - 내게 오는 길.mp4',
      expected: [ '성시경 Sung Si Kyung', '내게 오는 길' ] }
  ]
}
