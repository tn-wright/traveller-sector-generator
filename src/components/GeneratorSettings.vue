<script setup>
const props = defineProps({
  densityMatrix: Array,
  generate: Function
})

// Make a local copy to model the input off of, with values set to the prop at initialization
// Changes to this are passed back up to the parent with events
const localDensityMatrix = props.densityMatrix
</script>

<template>
  <div class="settings-container">
    <p>Welcome to my implementation of a sector generator for the Traveller role-playing game!</p>
    <p>
      This generator uses the default rules as provided in Mongoose Traveller 2nd edition. It
      creates a sector that is composed of 16 subsectors that are each 8 hexes wide and 10 hexes
      tall. These subsectors are arranged in a 4 by 4 grid to form the sector. The generator creates
      all of the planets in the sector and then constructs trade routes between them.
    </p>
    <p>
      The results are first shown in a map of the sector, where the hex coordinates and planet names
      are inside each hex. In addition, trade routes are shown as lines connecting hexes. Hover over
      a hex and wait a moment to see the planet's name and UWP in a tooltip. A full table of all
      planets is also available below the map which shows each planet's location, UWP, bases, trade
      tags, and travel code.
    </p>
    <p>
      To generate a sector, simply hit the generate button. If you wish to alter the density of
      planets in each subsector, you may modify the values in the "Subsector Densities" table. The
      default value is 0.5, meaning each hex in the corresponding subsector has a 50% to have a
      planet. A value of 1 will cause every hex in the subsector to have a planet, while a value of
      0 will result in no planets existing in the subsector. The rulebook recommends using 0.5 as
      the default with 0.667 for densely populated subsectors, 0.333 for sparse subsectors, and
      0.167 for rift subsectors.
    </p>
    <p>
      Please note that generation may take a little while, so do not refresh the page or hit the
      generate button more than once.
    </p>
    <table class="densityMatrix">
      <tr>
        <th colspan="5">Subsector Densities</th>
      </tr>
      <tr>
        <th></th>
        <th>Col 1</th>
        <th>Col 2</th>
        <th>Col 3</th>
        <th>Col 4</th>
      </tr>
      <tr class="densityRow">
        <th>Row 1</th>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 0, 0)"
            v-model="localDensityMatrix[0][0]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 0, 1)"
            v-model="localDensityMatrix[0][1]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 0, 2)"
            v-model="localDensityMatrix[0][2]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 0, 3)"
            v-model="localDensityMatrix[0][3]"
          />
        </td>
      </tr>
      <tr class="densityRow">
        <th>Row 2</th>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 1, 0)"
            v-model="localDensityMatrix[1][0]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 1, 1)"
            v-model="localDensityMatrix[1][1]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 1, 2)"
            v-model="localDensityMatrix[1][2]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 1, 3)"
            v-model="localDensityMatrix[1][3]"
          />
        </td>
      </tr>
      <tr class="densityRow">
        <th>Row 3</th>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 2, 0)"
            v-model="localDensityMatrix[2][0]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 2, 1)"
            v-model="localDensityMatrix[2][1]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 2, 2)"
            v-model="localDensityMatrix[2][2]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 2, 3)"
            v-model="localDensityMatrix[2][3]"
          />
        </td>
      </tr>
      <tr class="densityRow">
        <th>Row 4</th>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 3, 0)"
            v-model="localDensityMatrix[3][0]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 3, 1)"
            v-model="localDensityMatrix[3][1]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 3, 2)"
            v-model="localDensityMatrix[3][2]"
          />
        </td>
        <td>
          <input
            class="densityInput"
            @input="(event) => onInputChange(props.densityMatrix, 3, 3)"
            v-model="localDensityMatrix[3][3]"
          />
        </td>
      </tr>
    </table>
    <button @click="onGenerateButtonClick">Generate</button>
  </div>
</template>

<script>
export default {
  methods: {
    onInputChange(densityMatrix, firstIndex, secondIndex) {
      this.$emit(
        'densityInputChange',
        densityMatrix[firstIndex][secondIndex],
        firstIndex,
        secondIndex
      )
    },
    onGenerateButtonClick() {
      this.$emit('generateButtonClick')
    }
  }
}
</script>
