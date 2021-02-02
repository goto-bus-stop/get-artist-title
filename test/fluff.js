/* eslint-disable no-var */
'use strict'

/* eslint-disable object-curly-newline */
module.exports = {
  tests: [
    { input: 'Rush – Moving Pictures (Full Album)',
      expected: ['Rush', 'Moving Pictures'] },
    { input: 'Rush - Moving Pictures (album)',
      expected: ['Rush', 'Moving Pictures'] },
    { input: 'Rush - Moving Pictures (Official Album)',
      expected: ['Rush', 'Moving Pictures'] },
    { input: 'Rush - Moving Pictures (Full Album) (Official)',
      expected: ['Rush', 'Moving Pictures'] },
    { input: 'FILMMAKER - ETERNAL RETURN [FULL ALBUM]',
      expected: ['FILMMAKER', 'ETERNAL RETURN'] },
    { input: 'Dua Lipa - New Rules (Official Music Video) **NEW**',
      expected: ['Dua Lipa', 'New Rules'] },
    { input: 'Muse — The 2nd Law (Full Album) [HD]',
      expected: ['Muse', 'The 2nd Law'] },
    { input: 'BLESSED ~ Sorrows (Audio)',
      expected: ['BLESSED', 'Sorrows'] }
  ]
}
