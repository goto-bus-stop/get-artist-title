module.exports = {
  tests: [
    // https://www.youtube.com/watch?v=dYnDCHUzzaY
    // ":" is a possible separator, but should not be used in this case.
    { input: 'HA:TFELT [핫펠트(예은)] "Truth" M/V',
      // Ideal would be to include the Hangul but it's in
      // [] which means it's deleted for now.
      expected: [ 'HA:TFELT', 'Truth' ],
      optional: true },
    // https://www.youtube.com/watch?v=Qk52ypnGs68
    // "-" is a possible separator, but should not be used in this case.
    { input: 'T-ARA[티아라] "NUMBER NINE [넘버나인]" M/V',
      expected: [ 'T-ARA', 'NUMBER NINE' ],
      optional: true },
    // https://www.youtube.com/watch?v=aeo_nWsu5cs
    { input: '[MV] YOUNHA(윤하) _ Get It?(알아듣겠지) (Feat. HA:TFELT, CHEETAH(치타))',
      expected: [ 'YOUNHA(윤하)', 'Get It?(알아듣겠지) (Feat. HA:TFELT, CHEETAH(치타))' ] }
  ]
}
