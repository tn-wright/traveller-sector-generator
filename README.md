# traveller-sector-generator

Welcome to my implementation of a sector generator for the Traveller role-playing game!

This generator uses the default rules as provided in Mongoose Traveller 2nd edition. It creates a sector that is composed of 16 subsectors that are each 8 hexes wide and 10 hexes tall. These subsectors are arranged in a 4 by 4 grid to form the sector. The generator creates all of the planets in the sector and then constructs trade routes between them.

The results are first shown in a map of the sector, where the hex coordinates and planet names are inside each hex. In addition, trade routes are shown as lines connecting hexes. Hover over a hex and wait a moment to see the planet's name and UWP in a tooltip. A full table of all planets is also available below the map which shows each planet's location, UWP, bases, trade tags, and travel code.

To generate a sector, simply hit the generate button. If you wish to alter the density of planets in each subsector, you may modify the values in the "Subsector Densities" table. The default value is 0.5, meaning each hex in the corresponding subsector has a 50% to have a planet. A value of 1 will cause every hex in the subsector to have a planet, while a value of 0 will result in no planets existing in the subsector. The rulebook recommends using 0.5 as the default with 0.667 for densely populated subsectors, 0.333 for sparse subsectors, and 0.167 for rift subsectors.

Please note that generation may take a little while, so do not refresh the page or hit the generate button more than once.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
