const mutations = {
  setUser (state, data) {
    console.log(data)
    state.user = data
    console.log(state.user)
  }
}

export default mutations
