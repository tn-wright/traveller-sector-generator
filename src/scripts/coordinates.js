// Contains several functions that convert the coordinates of hexes between the traditional offset coords and cube coords
// Cube coords are much easier to work with for things like distance between two hexes
// This resource was used to learn and includes example functions: https://www.redblobgames.com/grids/hexagons/

// Holds the modifiers to each axis to move from one hex in a specified direction
// Each row represents one of the six hexes surrounded a starting hex
const cubeDirections = [
  { x: 1, y: -1, z: 0 },
  { x: 1, y: 0, z: -1 },
  { x: 0, y: 1, z: -1 },
  { x: -1, y: 1, z: 0 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: -1, z: 1 }
]

// Is a value x between some min and max, inclusive
function isBetween(x, min, max) {
  return x >= min && x <= max
}

// convert cube coordinates to offset coordinates
function cubeToOddQ(cube) {
  var col = cube.x
  var row = cube.z + (cube.x - (cube.x & 1)) / 2
  return { x: col, y: row }
}

// Convert offset coordinates to cube coordinates
function oddQToCube(coords) {
  let x = coords.x
  let z = coords.y - (coords.x - (coords.x & 1)) / 2
  let y = -x - z
  return { x: x, y: y, z: z }
}

// Add two cube coordinates together
function cubeAdd(cube1, cube2) {
  return {
    x: cube1.x + cube2.x,
    y: cube1.y + cube2.y,
    z: cube1.z + cube2.z
  }
}

// Multiply cube coordinates by a constant value
function cubeMultiplyConstant(cube, constant) {
  return {
    x: cube.x * constant,
    y: cube.y * constant,
    z: cube.z * constant
  }
}

// Get the cube coordinate shift value to move in a specific direction
function getCubeDirection(direction) {
  return cubeDirections[direction]
}

// Get the cube coordinates of a neighboring hex when moving in a specific direction and distance
function getCubeNeighbor(cube, direction, distance) {
  return cubeAdd(cube, cubeMultiplyConstant(getCubeDirection(direction), distance))
}

// Calculate the distance between two cube coordinates
function cubeDistance(cube1, cube2) {
  return (
    (Math.abs(cube1.x - cube2.x) + Math.abs(cube1.y - cube2.y) + Math.abs(cube1.z - cube2.z)) / 2
  )
}

//Get the distance between two hexes
export function getHexDistance(hex1, hex2) {
  let cube1 = oddQToCube(hex1)
  let cube2 = oddQToCube(hex2)
  return cubeDistance(cube1, cube2)
}

// Get the neighbor of a hex at a set direction and distance
function getHexNeighbor(hex, direction, distance) {
  let cube = oddQToCube(hex)
  let neighbor = getCubeNeighbor(cube, direction, distance)
  return cubeToOddQ(neighbor)
}

// Get all neighboring hexes to some starting hex
// A neighbor is a hex that is adjacent to the starting hex
export function getAllHexNeighbors(hex) {
  let neighbors = []
  for (let i = 0; i < cubeDirections.length; i++) {
    let neighbor = getHexNeighbor(hex, i, 1)
    // Verify that the hex coordinates are within our map, and therefore valid
    if (isBetween(neighbor.x, 0, 31) && isBetween(neighbor.y, 0, 39)) {
      neighbors.push(neighbor)
    }
  }
  return neighbors
}

// Get all neighbors that can be reached within maxDistance hops
// A hop is defined as a number of hexes away from a starting hex
export function getNHopNeighbors(hex, maxDistance, subsectorMatrix) {
  let cube = oddQToCube(hex)

  const results = []
  for (let x = cube.x - maxDistance; x <= cube.x + maxDistance; x++) {
    for (let y = cube.y - maxDistance; y <= cube.y + maxDistance; y++) {
      let z = -x - y
      let neighborHex = cubeToOddQ({ x: x, y: y, z: z })

      // Verify that the hex coordinates are within our map, and therefore valid
      if (!isBetween(neighborHex.x, 0, 31) || !isBetween(neighborHex.y, 0, 39)) {
        continue
      }

      // Check if a hex is supposed to have a planet, and if so, add that hex to the return list
      if (subsectorMatrix[neighborHex.y][neighborHex.x]) {
        results.push(subsectorMatrix[neighborHex.y][neighborHex.x])
      }
    }
  }

  return results
}
