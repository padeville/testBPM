<template>
  <div>
    <div :style="bpmStyle" class="beat beat-active">
      {{ bpmTick }} {{ this.$store.state.beat.bpm }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Beat',
  computed: {
    bpmTick () {
      return this.$store.state.beat.bpmTick
    },
    bpmStyle () {
      return {
        animation: `heartbeat ${this.$store.state.beat.bpm}ms infinite`
      }
    }
  },
  mounted () {}
}
</script>

<style scoped>
@keyframes heartbeat {
  0% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.75);
  }
}

.beat {
  background-color: white;
  width: 100px;
  height: 100px;
  color: black;
  line-height: 100px;
  text-align: center;
  border-radius: 50%;
  margin:auto;
}

.beat-active {
  animation: heartbeat 500ms infinite;
}
</style>
