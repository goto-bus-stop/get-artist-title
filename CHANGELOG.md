# get-artist-title change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## 1.3.1
* Support `~` as a separator. ([@DaliborTrampota](https://github.com/DaliborTrampota) in [#34](https://github.com/goto-bus-stop/get-artist-title/pull/34))
* Clean (Audio) fluff. ([@DaliborTrampota](https://github.com/DaliborTrampota) in [#34](https://github.com/goto-bus-stop/get-artist-title/pull/34))

## 1.3.0
* Add Node.js 12 to CI.
* Clean (Full Album) fluff. ([@jgchk](https://github.com/jgchk) in [#24](https://github.com/goto-bus-stop/get-artist-title/pull/24))

## 1.2.0
* Add Node.js 10 to CI.
* Add typescript type definitions.

## 1.1.1
* Remove video size names like `1080p`, `4K` from titles.

## 1.1.0
* Ignore potential artist/title separators inside quotes.
  Previously, a dash inside a quoted song title could cause this bug:
  ```js
  assert.strictEqual(
    oldGetArtistTitle('TWICE(트와이스) "OOH-AHH하게(Like OOH-AHH)"'),
    ['TWICE(트와이스) "OOH', 'AHH하게(Like OOH-AHH)"']
  )
  ```
  Now, it correctly identifies the title:
  ```js
  assert.strictEqual(
    getArtistTitle('TWICE(트와이스) "OOH-AHH하게(Like OOH-AHH)"'),
    ['TWICE(트와이스)', 'OOH-AHH하게(Like OOH-AHH)']
  )
  ```

## 1.0.0
* Remove custom plugin functionality.
