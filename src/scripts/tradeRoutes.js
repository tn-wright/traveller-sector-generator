import * as utils from './utils'
import * as coordinates from './coordinates'
import * as planetLib from './planets'

//Create some constants used for path-finding weights
const existingPathWeight = 1
const inToEmptyWeight = 16
const emptyToPopulatedWeight = 3
const populatedToPopulatedWeight = 2.5

export let tradeRoutes = []

//Sort all hexes that are open to the A* algorithm based on their current cost to reach
function sortOpenHexes(openHexes) {
  openHexes.sort((a, b) => a.f - b.f)
}

//Get the a* heuristic, which is distance in number of hexes
function aStarHeuristic(hex, target) {
  return coordinates.getHexDistance(hex, target)
}

//Check if a route already exists in the tradeRoutes array
function routeAlreadyExists(from, to) {
  let tempRoute = {
    startX: from.x,
    startY: from.y,
    endX: to.x,
    endY: to.y
  }
  for (const route of tradeRoutes) {
    if (isSameRouteSegment(route, tempRoute)) {
      return true
    }
  }
  return false
}

//Calculate the "move weight" of the route, which is based on the populated status of the starting and ending hexes
function calculateHexMoveWeight(from, to, subsectorMatrix) {
  //Check if the path already exists as this is the best case
  if (routeAlreadyExists(from, to)) {
    //path exists between the hexes already
    return existingPathWeight
  }

  //check if the destination hex is empty
  if (subsectorMatrix[to.y][to.x]) {
    //Check if we are coming from a populated hex
    if (subsectorMatrix[from.y][from.x]) {
      //we are coming from a populated hex
      return populatedToPopulatedWeight
    }

    //We are coming from an empty hex
    return emptyToPopulatedWeight
  }

  //Going to empty hex
  return inToEmptyWeight
}

//Build a trade route
function constructRoute(endNode) {
  let currNode = endNode
  let nextNode
  let routeArray = []

  //starting at the ending node of a route, push the route to a route array and move one step back in the route, until you reach the start
  do {
    nextNode = currNode.parent
    routeArray.push({
      startX: currNode.location.x,
      startY: currNode.location.y,
      endX: nextNode.location.x,
      endY: nextNode.location.y
    })
    currNode = nextNode
  } while (currNode.parent !== null)

  console.log(
    routeArray.map(
      (route) =>
        `${utils.hexCoordsToString({
          x: route.startX,
          y: route.startY
        })}->${utils.hexCoordsToString({ x: route.endX, y: route.endY })}`
    )
  )
  return routeArray
}

//Perform an A* search to get from one hex to another
function aStarSearch(startHex, targetHex, subsectorMatrix) {
  //Get the coordinates of the target hex
  const targetHexString = utils.hexCoordsToString(targetHex)

  //Create an open hex list, which currently only contains the starting hex
  const openHexes = [{ location: startHex, g: 0, f: 0, step: 0, parent: null }]

  //Loop until there are no more open hexes
  while (openHexes.length > 0) {
    let currHex = openHexes.shift()
    let currHexString = utils.hexCoordsToString(currHex.location)

    //If we have reached the target hex, we're done and we can build the route
    if (currHexString === targetHexString) {
      return constructRoute(currHex)
    }

    //This path has already reached the max of 4 hex, so do not bother checking it's neighbors
    if (currHex.step === 4) {
      continue
    }

    //Get all the neighbors of our current hex
    const neighbors = coordinates.getAllHexNeighbors(currHex.location)

    //For each neighbor
    for (const neighbor of neighbors) {
      //If both the current hex and the found neighbor are empty, skip this neighbor
      if (
        !subsectorMatrix[neighbor.y][neighbor.x] &&
        !subsectorMatrix[currHex.location.y][currHex.location.x]
      ) {
        continue
      }

      //Calculate the move weight for the current hex to the neighbor
      let weight = calculateHexMoveWeight(currHex.location, neighbor, subsectorMatrix)
      //Calculate the g value for the neighbor
      let neighborG = currHex.g + weight

      //Push the neighbor to the list of open hexes
      openHexes.push({
        location: neighbor,
        g: neighborG,
        f: neighborG + aStarHeuristic(neighbor, targetHex),
        step: currHex.step + 1,
        parent: currHex
      })
    }

    //Sort the open hexes list to ensure the lowest f is pulled next
    sortOpenHexes(openHexes)
  }

  //We've exhausted all open hexes and still not found a path. One does not exist
  console.log('No path was found')
  return []
}

//After we generate a route, make sure it is worth keeping
// This is determined by the trade codes of the starting planet and the ending planet
function shouldSaveTradeRoute(planetA, planetB) {
  if (!planetA || !planetB) {
    return false
  }

  const aIsFirstCategory = planetA.tradeCodes.includes('In') || planetA.tradeCodes.includes('Ht')
  const aIsSecondCategory =
    planetA.tradeCodes.includes('As') ||
    planetA.tradeCodes.includes('De') ||
    planetA.tradeCodes.includes('Ie') ||
    planetA.tradeCodes.includes('Ni')
  const aIsThirdCategory = planetA.tradeCodes.includes('Hi') || planetA.tradeCodes.includes('Ri')
  const aIsFourthCategory =
    planetA.tradeCodes.includes('Ag') ||
    planetA.tradeCodes.includes('Ga') ||
    planetA.tradeCodes.includes('Wa')

  const bIsFirstCategory = planetB.tradeCodes.includes('In') || planetB.tradeCodes.includes('Ht')
  const bIsSecondCategory =
    planetB.tradeCodes.includes('As') ||
    planetB.tradeCodes.includes('De') ||
    planetB.tradeCodes.includes('Ie') ||
    planetB.tradeCodes.includes('Ni')
  const bIsThirdCategory = planetB.tradeCodes.includes('Hi') || planetB.tradeCodes.includes('Ri')
  const bIsFourthCategory =
    planetB.tradeCodes.includes('Ag') ||
    planetB.tradeCodes.includes('Ga') ||
    planetB.tradeCodes.includes('Wa')

  const firstCase =
    (aIsFirstCategory && bIsSecondCategory) || (aIsSecondCategory && bIsFirstCategory)
  const secondCase =
    (aIsThirdCategory && bIsFourthCategory) || (aIsFourthCategory && bIsThirdCategory)

  return firstCase || secondCase
}

//Check if two routes are the same, regardless of direction
function isSamePair(a, b) {
  return (a.to === b.to && a.from === b.from) || (a.to === b.from && a.from === b.to)
}

// Check if two route segments are the same, regardless of direction
function isSameRouteSegment(a, b) {
  return (
    (a.startX === b.startX && a.startY === b.startY && a.endX === b.endX && a.endY === b.endY) ||
    (a.startX === b.endX && a.startY === b.endY && a.endX === b.startX && a.endY === b.startY)
  )
}

//Given an array of route segments, add each to the master tradeRoute list if it is not already in the list
function addRouteToMasterList(routeArray) {
  for (const segment of routeArray) {
    if (tradeRoutes.some((route) => isSameRouteSegment(route, segment))) {
      //dont add duplicate route segments if they are already in the master list
      continue
    }

    tradeRoutes.push(segment)
  }
}

//Generate trade routes
export function generateTradeRoutes(planets, subsectorMatrix) {
  const searchedPairs = []

  //Loop through all planets
  for (const fromPlanet of planets) {
    const fromHex = { x: fromPlanet.xCoord, y: fromPlanet.yCoord }
    //Get all neighbors within 4 hexes of the starting planet
    const neighbors = coordinates.getNHopNeighbors(fromHex, 4, subsectorMatrix)
    //Sort the neighbors to check the biggest and most advanced planets first
    neighbors.sort(planetLib.comparePlanetsByPopAndTech)

    //Loop through all neighbors and create a planet pair
    for (const toPlanet of neighbors) {
      const newPair = {
        from: fromPlanet.coordString,
        to: toPlanet.coordString
      }

      //This pair of planets has been searched, so do not do it again
      if (searchedPairs.some((pair) => isSamePair(pair, newPair))) {
        continue
      }

      //Add the planet pair to the list of pairs to find paths for, to make sure we don't try this pair again
      searchedPairs.push(newPair)

      //Either planets are the same or their tags to not warrent a trade route, so we don't need to pathfind
      if (
        fromPlanet.coordString === toPlanet.coordString ||
        !shouldSaveTradeRoute(fromPlanet, toPlanet)
      ) {
        continue
      }

      const toHex = { x: toPlanet.xCoord, y: toPlanet.yCoord }

      if (coordinates.getHexDistance(fromHex, toHex) > 4) {
        //Planets are out of range for a trade route, so skip this pair for path finding
        continue
      }
      console.log(`Finding path between ${fromPlanet.coordString} and ${toPlanet.coordString}`)
      //Pathfind and save the route
      addRouteToMasterList(aStarSearch(fromHex, toHex, subsectorMatrix))
    }
  }
}
