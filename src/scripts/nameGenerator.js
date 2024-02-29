function capitalize(word) {
  if (typeof word !== 'string') return ''
  return word.charAt(0).toUpperCase() + word.slice(1)
}

// Generate a random name, built from several arrays of character groupings
export function nameGen() {
  const nm1 = [
    'b',
    'c',
    'ch',
    'd',
    'g',
    'h',
    'k',
    'l',
    'm',
    'n',
    'p',
    'r',
    's',
    't',
    'th',
    'v',
    'x',
    'y',
    'z',
    '',
    '',
    '',
    '',
    ''
  ]
  const nm2 = ['a', 'e', 'i', 'o', 'u']
  const nm3 = [
    'b',
    'bb',
    'br',
    'c',
    'cc',
    'ch',
    'cr',
    'd',
    'dr',
    'g',
    'gn',
    'gr',
    'l',
    'll',
    'lr',
    'lm',
    'ln',
    'lv',
    'm',
    'n',
    'nd',
    'ng',
    'nk',
    'nn',
    'nr',
    'nv',
    'nz',
    'ph',
    's',
    'str',
    'th',
    'tr',
    'v',
    'z'
  ]
  const nm3b = [
    'b',
    'br',
    'c',
    'ch',
    'cr',
    'd',
    'dr',
    'g',
    'gn',
    'gr',
    'l',
    'll',
    'm',
    'n',
    'ph',
    's',
    'str',
    'th',
    'tr',
    'v',
    'z'
  ]
  const nm4 = [
    'a',
    'e',
    'i',
    'o',
    'u',
    'a',
    'e',
    'i',
    'o',
    'u',
    'a',
    'e',
    'i',
    'o',
    'u',
    'ae',
    'ai',
    'ao',
    'au',
    'a',
    'ea',
    'ei',
    'eo',
    'eu',
    'e',
    'ua',
    'ue',
    'ui',
    'u',
    'ia',
    'ie',
    'iu',
    'io',
    'oa',
    'ou',
    'oi',
    'o'
  ]
  const nm5 = [
    'turn',
    'ter',
    'nus',
    'rus',
    'tania',
    'hiri',
    'hines',
    'gawa',
    'nides',
    'carro',
    'rilia',
    'stea',
    'lia',
    'lea',
    'ria',
    'nov',
    'phus',
    'mia',
    'nerth',
    'wei',
    'ruta',
    'tov',
    'zuno',
    'vis',
    'lara',
    'nia',
    'liv',
    'tera',
    'gantu',
    'yama',
    'tune',
    'ter',
    'nus',
    'cury',
    'bos',
    'pra',
    'thea',
    'nope',
    'tis',
    'clite'
  ]
  const nm6 = [
    'una',
    'ion',
    'iea',
    'iri',
    'illes',
    'ides',
    'agua',
    'olla',
    'inda',
    'eshan',
    'oria',
    'ilia',
    'erth',
    'arth',
    'orth',
    'oth',
    'illon',
    'ichi',
    'ov',
    'arvis',
    'ara',
    'ars',
    'yke',
    'yria',
    'onoe',
    'ippe',
    'osie',
    'one',
    'ore',
    'ade',
    'adus',
    'urn',
    'ypso',
    'ora',
    'iuq',
    'orix',
    'apus',
    'ion',
    'eon',
    'eron',
    'ao',
    'omia'
  ]
  const nm7 = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ]

  // A randomly generated value that is used to determine what "kind" of name to create
  let nameDeterminer = Math.floor(Math.random() * 10)

  //Use different arrays to get parts of the name based on the nameDeterminer
  //Assemble all of the parts together, and then capitalize the first letter
  if (nameDeterminer < 2) {
    const rnd = (Math.random() * nm1.length) | 0
    const rnd2 = (Math.random() * nm2.length) | 0
    let rnd3 = (Math.random() * nm3.length) | 0
    while (nm1[rnd] === nm3[rnd3]) {
      rnd3 = (Math.random() * nm3.length) | 0
    }
    const rnd4 = (Math.random() * nm4.length) | 0
    const rnd5 = (Math.random() * nm5.length) | 0
    return capitalize(nm1[rnd] + nm2[rnd2] + nm3[rnd3] + nm4[rnd4] + nm5[rnd5])
  } else if (nameDeterminer < 4) {
    const rnd = (Math.random() * nm1.length) | 0
    const rnd2 = (Math.random() * nm2.length) | 0
    let rnd3 = (Math.random() * nm3.length) | 0
    while (nm1[rnd] === nm3[rnd3]) {
      rnd3 = (Math.random() * nm3.length) | 0
    }
    const rnd4 = (Math.random() * nm6.length) | 0
    return capitalize(nm1[rnd] + nm2[rnd2] + nm3[rnd3] + nm6[rnd4])
  } else if (nameDeterminer < 6) {
    const rnd = (Math.random() * nm1.length) | 0
    const rnd4 = (Math.random() * nm4.length) | 0
    const rnd5 = (Math.random() * nm5.length) | 0
    return capitalize(nm1[rnd] + nm4[rnd4] + nm5[rnd5])
  } else if (nameDeterminer < 8) {
    const rnd = (Math.random() * nm1.length) | 0
    const rnd2 = (Math.random() * nm2.length) | 0
    let rnd3 = (Math.random() * nm3b.length) | 0
    while (nm1[rnd] === nm3b[rnd3]) {
      rnd3 = (Math.random() * nm3b.length) | 0
    }
    const rnd4 = (Math.random() * nm2.length) | 0
    const rnd5 = (Math.random() * nm5.length) | 0
    return capitalize(nm3b[rnd3] + nm2[rnd2] + nm1[rnd] + nm2[rnd4] + nm5[rnd5])
  } else {
    const rnd = (Math.random() * nm3b.length) | 0
    const rnd2 = (Math.random() * nm6.length) | 0
    const rnd3 = (Math.random() * nm7.length) | 0
    const rnd4 = (Math.random() * nm7.length) | 0
    const rnd5 = (Math.random() * nm7.length) | 0
    const rnd6 = (Math.random() * nm7.length) | 0
    return capitalize(nm3b[rnd] + nm6[rnd2] + ' ' + nm7[rnd3] + nm7[rnd4] + nm7[rnd5] + nm7[rnd6])
  }
}
