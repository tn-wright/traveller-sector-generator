// Use the rules for Mongoose Traveller 2e to generate planets

import * as nameGenerator from './nameGenerator.js'
import * as utils from './utils'

export let planets = []

// Convert star port code from a number to the code letter
function getStarPortCode(value) {
  switch (value) {
    case 2:
      return 'X'
    case 3:
    case 4:
      return 'E'
    case 5:
    case 6:
      return 'D'
    case 7:
    case 8:
      return 'C'
    case 9:
    case 10:
      return 'B'
    case 11:
      return 'A'
  }
}

// Convert a number into a final code. Anything over 10 is represented by a letter
function getValueCode(value) {
  let val = Math.max(value, 0)

  if (val < 10) {
    return val.toString()
  } else {
    switch (val) {
      case 10:
        return 'A'
      case 11:
        return 'B'
      case 12:
        return 'C'
      case 13:
        return 'D'
      case 14:
        return 'E'
      case 15:
        return 'F'
      case 16:
        return 'G'
      case 17:
        return 'H'
      case 18:
        return 'I'
      case 19:
        return 'J'
      case 20:
        return 'K'
    }
  }

  console.log(value)
}

//Calculate the tech level of a planet based on several traits of that planet
function calculateTechLevel(
  starPort,
  size,
  atmosphere,
  hydrographics,
  population,
  government,
  enforceMin
) {
  let minTechLevel = 0
  let starPortMod = 0
  let sizeMod = 0
  let atmosphereMod = 0
  let hydrographicsMod = 0
  let populationMod = 0
  let governmentMod = 0

  //Get a minimum tech level based on the atmosphere
  if (atmosphere === 0 || atmosphere === 1) {
    minTechLevel = 8
  } else if (atmosphere === 2 || atmosphere === 3) {
    minTechLevel = 5
  } else if (atmosphere === 4 || atmosphere === 7 || atmosphere == 9) {
    minTechLevel = 3
  } else if (atmosphere === 10) {
    minTechLevel = 8
  } else if (atmosphere === 11) {
    minTechLevel = 9
  } else if (atmosphere === 12) {
    minTechLevel = 10
  } else if (atmosphere === 13 || atmosphere === 14) {
    minTechLevel = 5
  } else if (atmosphere === 15) {
    minTechLevel = 8
  }

  //How does the star port level effect it
  if (starPort >= 11) {
    starPortMod = 6
  } else if (starPort === 9 || starPort === 10) {
    starPortMod = 4
  } else if (starPort === 7 || starPort === 8) {
    starPortMod = 2
  } else if (starPort <= 2) {
    starPortMod = -4
  }

  //Get the size modifier
  if (size <= 1) {
    sizeMod = 2
  } else if (size >= 2 && size <= 4) {
    sizeMod = 1
  }

  //Get a special atmosphere mod
  if (atmosphere <= 3 || atmosphere >= 10) {
    atmosphereMod = 1
  }

  //Hydrographics mod
  if (hydrographics === 0 || hydrographics === 9) {
    hydrographicsMod = 1
  } else if (hydrographics === 10) {
    hydrographicsMod = 2
  }

  //Popultion mod
  if ((population >= 1 && population <= 5) || population === 8) {
    populationMod = 1
  } else if (population === 9) {
    populationMod = 2
  } else if (population === 10) {
    populationMod = 4
  }

  //Government type mod
  if (government === 0 || government === 5) {
    governmentMod = 1
  } else if (government === 7) {
    governmentMod = 2
  } else if (government === 13 || government === 14) {
    governmentMod = -2
  }

  //Generate the random base and add all of the mods
  const randomTechLevel =
    utils.rollDie() +
    starPortMod +
    sizeMod +
    atmosphereMod +
    hydrographicsMod +
    populationMod +
    governmentMod

  //If this planet needs a minimum, cap the number, otherwise don't let it drop below 0
  return enforceMin ? Math.max(minTechLevel, randomTechLevel) : Math.max(randomTechLevel, 0)
}

// Generate the bases, which could be naval, scout, research, or TAS
function generateBases(starPortCode, hasGasGiant) {
  let hasNaval = false
  let hasScout = false
  let hasResearch = false
  let hasTAS = false

  // The stations present depend on the class of star port on the world
  switch (starPortCode) {
    case 'A':
      hasNaval = utils.rollTwoDice() >= 8
      hasScout = utils.rollTwoDice() >= 10
      hasResearch = utils.rollTwoDice() >= 8
      hasTAS = true
      break
    case 'B':
      hasNaval = utils.rollTwoDice() >= 8
      hasScout = utils.rollTwoDice() >= 8
      hasResearch = utils.rollTwoDice() >= 10
      hasTAS = true
      break
    case 'C':
      hasScout = utils.rollTwoDice() >= 8
      hasResearch = utils.rollTwoDice() >= 10
      hasTAS = utils.rollTwoDice() >= 10
      break
    case 'D':
      hasScout = utils.rollTwoDice() >= 7
  }

  //Create a string that represents the bases. It also includes gas giants, which was passed into the function as param
  const baseString =
    (hasNaval ? 'N' : '') +
    (hasScout ? 'S' : '') +
    (hasResearch ? 'R' : '') +
    (hasTAS ? 'T' : '') +
    (hasGasGiant ? 'G' : '')
  return baseString
}

//Generate the trade codes for the world
function generateTradeCodes(
  size,
  atmosphere,
  hydrographics,
  population,
  government,
  lawLevel,
  techLevel
) {
  let tradeCodes = []

  //Each trade code depends on a set of criteria, so each is checked in turn in an if statment and added to a list if applicable
  if (
    atmosphere >= 4 &&
    atmosphere <= 9 &&
    hydrographics >= 4 &&
    hydrographics <= 8 &&
    population >= 5 &&
    population <= 7
  ) {
    tradeCodes.push('Ag')
  }

  if (size === 0 && atmosphere === 0 && hydrographics === 0) {
    tradeCodes.push('As')
  }

  if (population === 0 && government === 0 && lawLevel === 0) {
    tradeCodes.push('Ba')
  }

  if (atmosphere >= 2 && hydrographics === 0) {
    tradeCodes.push('De')
  }

  if (atmosphere >= 10 && hydrographics >= 1) {
    tradeCodes.push('Fl')
  }

  if (
    size >= 6 &&
    size <= 8 &&
    (atmosphere === 5 || atmosphere === 6 || atmosphere === 8) &&
    hydrographics >= 5 &&
    hydrographics <= 7
  ) {
    tradeCodes.push('Ga')
  }

  if (population >= 9) {
    tradeCodes.push('Hi')
  }

  if (techLevel >= 12) {
    tradeCodes.push('Ht')
  }

  if ((atmosphere === 0 || atmosphere === 1) && hydrographics >= 1) {
    tradeCodes.push('Ic')
  }

  if (
    ((atmosphere >= 0 && atmosphere <= 2) ||
      atmosphere === 4 ||
      atmosphere === 7 ||
      atmosphere === 9) &&
    population >= 9
  ) {
    tradeCodes.push('In')
  }

  if (population <= 3) {
    tradeCodes.push('Lo')
  }

  if (techLevel <= 5) {
    tradeCodes.push('Lt')
  }

  if (
    atmosphere >= 0 &&
    atmosphere <= 3 &&
    hydrographics >= 0 &&
    hydrographics <= 3 &&
    population >= 6
  ) {
    tradeCodes.push('Na')
  }

  if (population >= 0 && population <= 6) {
    tradeCodes.push('Ni')
  }

  if (atmosphere >= 2 && atmosphere <= 5 && hydrographics >= 0 && hydrographics <= 3) {
    tradeCodes.push('Po')
  }

  if (
    (atmosphere === 6 || atmosphere === 8) &&
    population >= 6 &&
    population <= 8 &&
    government >= 4 &&
    government <= 9
  ) {
    tradeCodes.push('Ri')
  }

  if (atmosphere === 0) {
    tradeCodes.push('Va')
  }

  if (hydrographics >= 10) {
    tradeCodes.push('Wa')
  }

  //Return a string of all trade codes separated by spaces
  return tradeCodes.join(' ')
}

// Generate the travel code
// This function is technically incomplete. It will only generate the Amber code
// The Red code has no ground rules for it's application and is determinded by the
// referee. Therefore, it has been excluded here
function generateTravelCode(atmosphere, government, lawLevel) {
  if (
    atmosphere >= 10 ||
    government === 0 ||
    government === 7 ||
    government === 10 ||
    lawLevel === 0 ||
    lawLevel >= 9
  ) {
    return 'A'
  }

  return ''
}

// Generate a planet at a set of coordinates
function generatePlanet(x, y) {
  // Roll some dice to determine a few starting traits about the planet
  const hasGasGiant = utils.rollTwoDice() >= 10 ? false : true
  const size = utils.rollTwoDice(-2, 0, 10)
  const sizeCode = getValueCode(size)

  //Generate an atmosphere and use that to get the modifier for temperature
  const atmosphere = utils.rollTwoDice(-7 + size, 0, 15)
  const atmosphereCode = getValueCode(atmosphere)
  let temperatureMod = 0
  if (atmosphere === 2 || atmosphere === 3) {
    temperatureMod = -2
  } else if (atmosphere === 4 || atmosphere === 5 || atmosphere === 14) {
    temperatureMod = -1
  } else if (atmosphere === 6 || atmosphere === 7) {
    temperatureMod = 0
  } else if (atmosphere === 8 || atmosphere === 9) {
    temperatureMod = 1
  } else if (atmosphere === 10 || atmosphere === 13 || atmosphere === 15) {
    temperatureMod = 2
  } else if (atmosphere === 11 || atmosphere === 12) {
    temperatureMod = 6
  }

  //Generate temperature and then calculate the hydrographics mod
  const temperature = utils.rollTwoDice(temperatureMod, 2, 12)
  let hydroMod = -7 + atmosphere

  //Additional hydrographics mod based on atmosphere
  if (
    atmosphere === 0 ||
    atmosphere === 1 ||
    atmosphere === 10 ||
    atmosphere === 11 ||
    atmosphere === 12
  ) {
    hydroMod = -4
  }

  if (atmosphere !== 13) {
    if (temperature === 10 || temperature === 11) {
      hydroMod += -2
    } else if (temperature >= 12) {
      hydroMod += -6
    }
  }

  //Generate the hydrographics information
  const hydrographics = size > 1 ? utils.rollTwoDice(hydroMod, 0, 10) : 0
  const hydrographicsCode = getValueCode(hydrographics)

  //Generate the population of the world
  const population = utils.rollTwoDice(-2, 0, 12)
  const populationCode = getValueCode(population)

  //Generate the government type, which is modifierd by the population
  const government = population === 0 ? 0 : utils.rollTwoDice(-7 + population, 0, 15)
  const governmentCode = getValueCode(government)
  //From government type, we may have a faction modifier
  let factionNumMod = 0
  if (government === 0 || government === 7) {
    factionNumMod = 1
  } else if (government >= 10) {
    factionNumMod = -1
  }

  //Generate the factions fo the world
  let factions = []

  const factionNumber = population === 0 ? 0 : Math.ceil(utils.rollDie() / 2) + factionNumMod

  for (let f = 0; f < factionNumber; f++) {
    const faction = {
      strength: utils.rollTwoDice(),
      government: getValueCode(utils.rollTwoDice(-7 + population, 0, 15))
    }
    factions.push(faction)
  }

  //Generate culture and law level for the world
  const culture = population === 0 ? 0 : utils.rollDie() * 10 + utils.rollDie()
  const lawLevel = population === 0 ? 0 : utils.rollTwoDice(-7 + government, 0, 99)
  const lawLevelCode = getValueCode(lawLevel)
  let starPortMod = 0
  if (population >= 10) {
    starPortMod = 2
  } else if (population >= 8) {
    starPortMod = 1
  } else if (population <= 2) {
    starPortMod = -2
  } else if (population <= 4) {
    starPortMod = -1
  }

  //Generate the star port
  const starPort = utils.rollTwoDice(starPortMod, 2, 11)
  const starPortCode = getStarPortCode(starPort)

  //Calculate the tech level
  const techLevel =
    population === 0
      ? 0
      : calculateTechLevel(starPort, size, atmosphere, hydrographics, population, government, false)

  //Create the UWP profile string
  const profile =
    starPortCode +
    sizeCode +
    atmosphereCode +
    hydrographicsCode +
    populationCode +
    governmentCode +
    lawLevelCode +
    '-' +
    techLevel.toString()

  //Generate bases
  const bases = generateBases(starPortCode, hasGasGiant)

  //Generate trade codes
  const tradeCodes = generateTradeCodes(
    size,
    atmosphere,
    hydrographics,
    population,
    government,
    lawLevel,
    techLevel
  )

  //generate the travel code
  const travelCode = generateTravelCode(atmosphere, government, lawLevel)

  //Create the planet object
  let planet = {
    xCoord: x,
    yCoord: y,
    coordString: x.toString().padStart(2, '0') + y.toString().padStart(2, '0'),
    name: nameGenerator.nameGen(),
    hasGasGiant: hasGasGiant,
    size: sizeCode,
    atmosphere: atmosphereCode,
    temperature: temperature,
    hydrographics: hydrographicsCode,
    population: populationCode,
    governemnt: governmentCode,
    culture: culture,
    factions: factions,
    lawLevel: lawLevelCode,
    starPort: starPortCode,
    techLevel: techLevel,
    profileString: profile,
    bases: bases,
    tradeCodes: tradeCodes,
    travelCode: travelCode
  }

  //Push the planet to the array of all planets, and then return this planet
  planets.push(planet)
  return planet
}

//Function to compare two planets pased on their population and tech level
export function comparePlanetsByPopAndTech(a, b) {
  return b.techLevel + b.population - (a.techLevel + a.population)
}

//Function to compare planets based on the coordinates
export function generatePlanetLocations(subsectorDensities, subsectorMatrix) {
  for (let i = 0; i < subsectorDensities.length; i++) {
    for (let j = 0; j < subsectorDensities[i].length; j++) {
      for (let y = 0; y < subsectorMatrix.length / subsectorDensities.length; y++) {
        for (let x = 0; x < subsectorMatrix[y].length / subsectorDensities[i].length; x++) {
          subsectorMatrix[y + 10 * i][x + 8 * j] =
            Math.random() < subsectorDensities[i][j] ? generatePlanet(x + 8 * j, y + 10 * i) : null
        }
      }
    }
  }
  console.log(subsectorMatrix)
}
