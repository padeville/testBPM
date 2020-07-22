<template>
  <v-card class="mx-auto" max-width="800">
    <v-card-text>
      <v-row>
        <transition-group name="list" tag="p">
          <span v-for="(item, index) in bpmPerClic()" :key="index" class="list-item">{{ item }} </span>
        </transition-group>
      </v-row>
      <v-row class="mb-4" justify="space-between">
        <v-col class="text-left d-flex flex-column">
          <span>BeatTimer</span>
          <span v-for="b in beatTimer" :key="b" class="subheading font-weight-light mr-1">{{ b }}</span>
        </v-col>
        <v-col class="text-right d-flex flex-column">
          <span v-for="b in beatClick" :key="b">{{ b }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-left d-flex flex-column">bpm : {{ calcStat() }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Stats',
  data() {
    return {
      stat: {
        avg: 0
      }
    }
  },
  computed: {
    beatTimer () {
      return this.$store.state.beat.beatTimer
    },
    beatClick () {
      return this.$store.state.beat.beatClick
    },
  },
  methods: {
    bpmPerClic () {
      return this.beatClick.map((x, index, arr) => {
        // console.log(x, index, arr[index + 1])
        // console.log(index, arr[index + 1] - x, arr[index] - arr[0] + 1000 * index)
        if (arr[index + 1]) {
          return Math.round((1 / ((arr[index + 1] - x) / 1000)) * 60)
        }
        return 0
      })
    },
    calcStat () {
      const arrayDiff = this.beatClick.map((x, index, arr) => {
        // console.log(x, index, arr[index + 1])
        // console.log(index, arr[index + 1] - x, arr[index] - arr[0] + 1000 * index)
        if (arr[index + 1]) {
          return Math.round((1 / ((arr[index + 1] - x) / 1000)) * 60)
        }
        return 0
      })
      console.log(arrayDiff)
      const sum = arrayDiff.reduce((x, y) => x + y, 0)
      return sum / this.beatClick.length
    }
  }
}
</script>
