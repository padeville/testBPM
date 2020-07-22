
export const state = () => ({
  triggerBeat: false,
  firstTrigger: false,
  bpmTick: 0,
  bpm: 70,
  isPlaying: false,
  beatTimer: [],
  beatClick: []
})

export const mutations = {
  triggerBeat (state) {
    state.triggerBeat = true
  },
  unTriggerBeat (state) {
    state.triggerBeat = false
  },
  bpmTick (state) {
    state.bpmTick += 1
    state.beatTimer.push(new Date().getTime())
  },
  firstTrigger (state) {
    state.firstTrigger = true
  },
  decrement (state) {
    state.bpm--
  },
  increment (state) {
    state.bpm++
  },
  toggle (state) {
    state.isPlaying = !state.isPlaying
  },
  setBpm (state, val) {
    state.bpm = val
  },
  beatClick (state) {
    state.beatClick.push(new Date().getTime())
  },
  stopBpm (state) {
    state.bpmTick = []
  }
}

export const actions = {
  triggerBeat ({ commit, state }) {
    commit('triggerBeat')
    commit('beatClick')
    if (!state.firstTrigger) {
      commit('firstTrigger')
      commit('bpmTick')
      console.log(state.bpm)
      const idIntervar = setInterval(() => {
        commit('bpmTick')
        console.log(state.bpmTick)
        if (state.bpmTick >= 10) {
          commit('stopBpm')
          clearInterval(idIntervar)
        }
      }, (60 / state.bpm) * 1000)
    }
  }
}
