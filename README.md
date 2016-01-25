# get-artist-title

Get the artist and title from a song name, eg. a YouTube video title.

## Usage

```js
const getArtistTitle = require('get-artist-title')
getArtistTitle('Taylor Swift - Out Of The Woods')
//→ ['Taylor Swift', 'Out Of The Woods']

let [ artist, title ] = getArtistTitle('FEMM - PoW! (Music Video)')
//→ ['FEMM', 'PoW!']
```

## Licence

[MIT](./LICENSE)
