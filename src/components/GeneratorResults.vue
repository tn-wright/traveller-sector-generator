<script setup>
defineProps({
  subsectorMatrix: Array,
  planetArray: Array,
  tradeRouteArray: Array
})

// Define constants that are used to size and format the display of the generator
const planetNameSize = 0.6
const hexWidth = 70
const hexHeight = hexWidth * 0.866
const hexHalfWidth = hexWidth / 2
const hexHalfHeight = hexHeight / 2
const hexQuarterWidth = hexWidth / 4
const hexThreeQuartersWidth = hexQuarterWidth * 3
</script>

<template>
  <svg
    v-bind:width="
      Math.floor(subsectorMatrix[0].length / 2) * hexWidth +
      (Math.ceil(subsectorMatrix[0].length / 2) - 1) * hexHalfWidth +
      hexThreeQuartersWidth
    "
    v-bind:height="subsectorMatrix.length * hexHeight + hexHalfHeight"
  >
    <g v-for="(rowArray, yIndex) of subsectorMatrix" :key="yIndex" class="row">
      <g v-for="(planet, xIndex) of rowArray" :key="xIndex">
        <polygon
          class="hex"
          v-bind:points="
            0 +
            hexThreeQuartersWidth * xIndex +
            ',' +
            (hexHalfHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexQuarterWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (0 + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexThreeQuartersWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (0 + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (hexHalfHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexThreeQuartersWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (hexHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexQuarterWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (hexHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0))
          "
        />
      </g>
    </g>
    <g class="routes">
      <line
        v-for="routeSection of tradeRouteArray"
        v-bind:x1="hexHalfWidth + hexThreeQuartersWidth * routeSection.startX"
        v-bind:y1="
          hexHalfHeight +
          hexHeight * routeSection.startY +
          (routeSection.startX % 2 === 1 ? hexHalfHeight : 0)
        "
        v-bind:x2="hexHalfWidth + hexThreeQuartersWidth * routeSection.endX"
        v-bind:y2="
          hexHalfHeight +
          hexHeight * routeSection.endY +
          (routeSection.endX % 2 === 1 ? hexHalfHeight : 0)
        "
        :key="routeSection.startX + routeSection.startY + routeSection.endX + routeSection.endY"
      />
    </g>
    <g v-for="(rowArray, yIndex) of subsectorMatrix" class="row" :key="yIndex">
      <g v-for="(planet, xIndex) of rowArray" :key="xIndex">
        <text
          class="hexCoords"
          text-anchor="middle"
          v-bind:x="hexHalfWidth + hexThreeQuartersWidth * xIndex"
          v-bind:y="hexHeight / 5 + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)"
        >
          {{ xIndex.toString().padStart(2, '0') }}{{ yIndex.toString().padStart(2, '0') }}
        </text>
        <text
          class="planetName"
          text-anchor="middle"
          v-bind:style="{ fontSize: planetNameSize + 'rem' }"
          v-bind:x="hexHalfWidth + hexThreeQuartersWidth * xIndex"
          v-bind:y="
            hexHeight * (7 / 8) + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)
          "
        >
          {{ planet ? planet.name : '' }}
        </text>
        <circle
          v-if="planet"
          class="system"
          v-bind:cx="hexHalfWidth + hexThreeQuartersWidth * xIndex"
          v-bind:cy="hexHalfHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)"
          v-bind:r="hexWidth / 10"
        />
      </g>
    </g>
    <g v-for="(rowArray, yIndex) of subsectorMatrix" class="row" :key="yIndex">
      <g v-for="(planet, xIndex) of rowArray" :key="xIndex">
        <polygon
          class="overlayHex"
          v-bind:points="
            0 +
            hexThreeQuartersWidth * xIndex +
            ',' +
            (hexHalfHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexQuarterWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (0 + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexThreeQuartersWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (0 + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (hexHalfHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexThreeQuartersWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (hexHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0)) +
            ' ' +
            (hexQuarterWidth + hexThreeQuartersWidth * xIndex) +
            ',' +
            (hexHeight + hexHeight * yIndex + (xIndex % 2 === 1 ? hexHalfHeight : 0))
          "
        >
          <title v-if="planet">{{ planet.name + '\n' }}{{ planet.profileString }}</title>
        </polygon>
      </g>
    </g>
  </svg>
  <div class="tableContainer">
    <table class="planetsTable">
      <tr>
        <th>Name</th>
        <th>Coordinates</th>
        <th>Code</th>
        <th>Bases</th>
        <th>Trade Codes</th>
        <th>Travel Code</th>
      </tr>
      <tr v-for="planet of planetArray.slice(0, Math.ceil(planetArray.length / 2))" :key="planet">
        <td>{{ planet.name }}</td>
        <td>{{ planet.coordString }}</td>
        <td>{{ planet.profileString }}</td>
        <td>{{ planet.bases }}</td>
        <td>{{ planet.tradeCodes }}</td>
        <td>{{ planet.travelCode }}</td>
      </tr>
    </table>
    <table class="planetsTable">
      <tr>
        <th>Name</th>
        <th>Coordinates</th>
        <th>Code</th>
        <th>Bases</th>
        <th>Trade Codes</th>
        <th>Travel Code</th>
      </tr>
      <tr v-for="planet of planetArray.slice(-Math.ceil(planetArray.length / 2))" :key="planet">
        <td>{{ planet.name }}</td>
        <td>{{ planet.coordString }}</td>
        <td>{{ planet.profileString }}</td>
        <td>{{ planet.bases }}</td>
        <td>{{ planet.tradeCodes }}</td>
        <td>{{ planet.travelCode }}</td>
      </tr>
    </table>
  </div>
</template>
