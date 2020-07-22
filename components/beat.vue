<template>
  <div class=" d-flex jutify-center" style="backgroud: white">
    <div class="beat" :class="{ 'beat-active': triggerBeat }" />
  </div>
</template>

<script>
export default {
  name: 'Beat',
  computed: {
    triggerBeat () {
      return this.$store.state.beat.triggerBeat
    }
  },
  mounted () {
  }
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
  background-color: red;
  width: 50px;
  height: 50px;
}

.beat-active {
  animation: heartbeat 1s;
}
</style>
