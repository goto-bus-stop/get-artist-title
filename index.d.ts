interface GetArtistTitleOptions {
  defaultArtist?: string;
  defaultTitle?: string;
}

/**
 * Get an artist and song title from a string.
 *
 * Returns `undefined` if no artist/title pair is detected.
 */
declare function getArtistTitle(input: string, options?: GetArtistTitleOptions): [string, string] | undefined

export = getArtistTitle
