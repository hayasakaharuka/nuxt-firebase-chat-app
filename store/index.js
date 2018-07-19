import firebase from '~/plugins/firebase'
import { firebaseMutations } from 'vuexfire'

export const strict = false

const postsRef = firebase.database().ref('/messages')

export const state = () => ({
  post: null,
  user: null,
})

export const getters = {
  post: state => {
    const post = state.post
    if (!post) return null
    return post
  },
  user: state => state.user
}

export const mutations = {
  saveMessage (state, { post }) {
    state.post = post
  },
  setUser(state, user) {
    state.user = user
  },
  ...firebaseMutations
}

export const actions = {
  async INIT_SINGLE ({ commit }, { id }) {
    const snapshot = await postsRef.child(id).once('value')
    commit('saveMessage', { post: snapshot.val() })
  },
  writeUser({ commit }, value) {
    commit('setUser', value)
  }
}
