export const state = () => ({
  user: {}
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  writeUser(context, value) {
    context.commit('setUser', value)
  }
}