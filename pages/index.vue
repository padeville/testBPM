<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm10 md10>
      <div class="text-center">
          <metronome />
      </div>
      <v-card>
        <stats />
        <v-card-title class="headline">
          Welcome to truc muche
          aezr
        </v-card-title>
        <v-card-text>
          <beat />
        </v-card-text>
        <v-card-actions>
          <v-text-field>Vitesse Bpm</v-text-field>
          <v-btn color="primary" @click="playKick()">
            play beat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Index',
  components: {
  },
  data () {
    return {
      kick: null
    }
  },
  mounted () {
    this.kick = new Audio(require('@/assets/audio/kick23.wav'))
    window.addEventListener('keyup', this.onKeyUp, false)
    window.addEventListener('keydown', this.onKeyDown, false)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.onKeyDown, false)
    window.removeEventListener('keyup', this.onKeyUp, false)
  },
  methods: {
    ...mapMutations({
      toggleBeat: 'beat/triggerBeat'
    }),
    playKick () {
      this.kick.currentTime = 0
      this.kick.play()
    },
    onKeyDown (e) {
      this.playKick()
      this.$store.dispatch('beat/triggerBeat')
      this.$emit('keydown', e.which)
    },
    onKeyUp (e) {
      this.$store.commit('beat/unTriggerBeat')
      this.$emit('keyup', e.which)
    }
  }
}
</script>
