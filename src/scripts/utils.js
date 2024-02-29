// Convert the x and y coordinates into a single coordinate string
export function hexCoordsToString(hex) {
  return hex.x.toString().padStart(2, '0') + hex.y.toString().padStart(2, '0')
}

// Generate a single value between 1 and 6, inclusive.
// A modifier can be added to the roll, that is added to the random number
// Default modifier is 0
export function rollDie(modifier = 0) {
  return Math.floor(Math.random() * 6 + 1) + modifier
}

// Roll two dice, each one getting a value between 1 and 6, then add the results together
// Optionally supply a modifier that is added to the final result.
// May also specify bounds of the roll, the will force the roll to have a specific min and max
export function rollTwoDice(modifier = 0, min = 2, max = 12) {
  let die1 = rollDie()
  let die2 = rollDie()
  return Math.min(Math.max(die1 + die2 + modifier, min), max)
}
