
<template>
  <v-card class="mx-auto" max-width="800">
    <v-toolbar flat dense>
      <v-toolbar-title>
        <span class="subheading">METRONOME</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-row class="mb-4" justify="space-between">
        <v-col class="text-left">
          <span class="display-3 font-weight-light" v-text="bpm" />
          <span class="subheading font-weight-light mr-1">BPM</span>
        </v-col>
        <v-col class="text-right">
          <v-btn :color="color" dark depressed fab @click="toggle">
            <v-icon large>
              {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-fade-transition>
            <v-avatar
              v-if="isPlaying"
              :color="color"
              :style="{
                animationDuration: animationDuration
              }"
              class="mb-1 v-avatar--metronome"
              size="52"
            />
          </v-fade-transition>
        </v-col>
      </v-row>
      <v-slider
        v-model="bpm"
        :color="color"
        track-color="grey"
        always-dirty
        min="40"
        max="218"
      >
        <template v-slot:prepend>
          <v-icon :color="color" @click="decrement">
            mdi-minus
          </v-icon>
        </template>

        <template v-slot:append>
          <v-icon :color="color" @click="increment">
            mdi-plus
          </v-icon>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    interval: null
  }),

  computed: {
    bpm: {
      get () {
        return this.$store.state.beat.bpm
      },
      set (val) {
        this.$store.commit('beat/setBpm', val)
      }
    },
    isPlaying () {
      return this.$store.state.beat.isPlaying
    },
    color () {
      if (this.bpm < 100) { return 'indigo' }
      if (this.bpm < 125) { return 'teal' }
      if (this.bpm < 140) { return 'green' }
      if (this.bpm < 175) { return 'orange' }
      return 'red'
    },
    animationDuration () {
      return `${60 / this.bpm}s`
    }
  },

  methods: {
    decrement () {
      this.$store.commit('beat/decrement')
    },
    increment () {
      this.$store.commit('beat/increment')
    },
    toggle () {
      this.$store.commit('beat/toggle')
    }
  }
}
</script>

<style>
@keyframes metronome-example {
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
}

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
