/* eslint-disable no-var */
'use strict'

/* eslint-disable object-curly-newline */
module.exports = {
  // K-pop song titles taken from JYP entertainment's Most Popular page:
  // https://www.youtube.com/user/jypentertainment/videos?flow=grid&view=0&sort=p
  // jypentertainment uses a title format like:
  // Artist "Title" Fluff
  tests: [
    // This one is not so fun because there is a separator (-) inside the quotes,
    // and separators are usually tried first.
    { input: 'TWICE(트와이스) "OOH-AHH하게(Like OOH-AHH)" M/V',
      expected: ['TWICE(트와이스)', 'OOH-AHH하게(Like OOH-AHH)'] },
    { input: 'GOT7 "Just right(딱 좋아)" M/V',
      expected: ['GOT7', 'Just right(딱 좋아)'] },
    { input: 'miss A “Only You(다른 남자 말고 너)” M/V',
      expected: ['miss A', 'Only You(다른 남자 말고 너)'] },
    { input: 'GOT7 "If You Do(니가 하면)" M/V',
      expected: ['GOT7', 'If You Do(니가 하면)'] },
    { input: 'GOT7 "A" M/V',
      expected: ['GOT7', 'A'] },
    { input: 'J.Y. Park(박진영) "Who\'s your mama?(어머님이 누구니) (feat. Jessi)" M/V',
      expected: ['J.Y. Park(박진영)', 'Who\'s your mama?(어머님이 누구니) (feat. Jessi)'] },
    { input: 'GOT7 "Girls Girls Girls" M/V',
      expected: ['GOT7', 'Girls Girls Girls'] },
    { input: 'GOT7 “Stop stop it(하지하지마)” M/V',
      expected: ['GOT7', 'Stop stop it(하지하지마)'] },
    { input: '2PM “GO CRAZY!(미친거 아니야?)” M/V',
      expected: ['2PM', 'GO CRAZY!(미친거 아니야?)'] },
    { input: '2PM "A.D.T.O.Y.(하.니.뿐.)" M/V',
      expected: ['2PM', 'A.D.T.O.Y.(하.니.뿐.)'] },
    { input: '2PM “My House(우리집)” M/V',
      expected: ['2PM', 'My House(우리집)'] },
    { input: 'GOT7 “Fly” M/V',
      expected: ['GOT7', 'Fly'] },
    { input: 'Wonder Girls "I Feel You" M/V',
      expected: ['Wonder Girls', 'I Feel You'] },
    { input: 'GOT7 "I Like You(난 니가 좋아)" Dance Practice',
      expected: ['GOT7', 'I Like You(난 니가 좋아)'] },
    { input: 'GOT7 "Just right(딱 좋아)" Dance Practice #2 (Just Crazy Boyfriend Ver.)',
      expected: ['GOT7', 'Just right(딱 좋아)'] },
    { input: 'GOT7 "Stop stop it(하지하지마)" Dance Practice',
      expected: ['GOT7', 'Stop stop it(하지하지마)'] },
    { input: '2PM "Comeback When You Hear This Song(이 노래를 듣고 돌아와)" M/V',
      expected: ['2PM', 'Comeback When You Hear This Song(이 노래를 듣고 돌아와)'] },
    { input: 'Sunmi(선미) "Full Moon(보름달)" M/V',
      expected: ['Sunmi(선미)', 'Full Moon(보름달)'] },
    { input: 'GOT7 "Magnetic(너란 걸)" Dance Practice',
      expected: ['GOT7', 'Magnetic(너란 걸)'] },
    { input: 'miss A "Only You(다른 남자 말고 너)" Dance Practice',
      expected: ['miss A', 'Only You(다른 남자 말고 너)'] },
    { input: 'Baek A Yeon(백아연) “Shouldn’t Have…(이럴거면 그러지말지) (Feat. Young K)” M/V',
      expected: ['Baek A Yeon(백아연)', 'Shouldn’t Have…(이럴거면 그러지말지) (Feat. Young K)'] },
    { input: 'DAY6 "Congratulations" M/V',
      expected: ['DAY6', 'Congratulations'] },
    { input: 'Wonder Girls "Tell me" M/V',
      expected: ['Wonder Girls', 'Tell me'] },
    { input: 'GOT7 "Confession Song(고백송)" M/V',
      expected: ['GOT7', 'Confession Song(고백송)'] },
    { input: 'GOT7 "Stop stop it(하지하지마)" Dance Practice #2 (Crazy Boyfriend Ver.)',
      expected: ['GOT7', 'Stop stop it(하지하지마)'] },
    { input: 'GOT7 "A" Dance Practice',
      expected: ['GOT7', 'A'] },
    { input: 'GOT7 "Girls Girls Girls" Dance Practice #2',
      expected: ['GOT7', 'Girls Girls Girls'] },
    { input: 'GOT7 "If You Do(니가 하면)" Dance Practice',
      expected: ['GOT7', 'If You Do(니가 하면)'] }
  ]
}
