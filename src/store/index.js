import { firebase } from '~/plugins/firebase'
import { firebaseMutations } from 'vuexfire'

export const strict = false;

const collections = firebase.firestore().collection('messages');

export const state = () => ({
  post: null,
  user: null,
});

export const getters = {
  post: state => {
    const post = state.post;
    if (!post) return null;
    return post
  },
  user: state => state.user
};

export const mutations = {
  saveMessage (state, { post }) {
    state.post = post
  },
  setUser(state, user) {
    state.user = user
  },
  ...firebaseMutations
};

export const actions = {
  async INIT_SINGLE ({ commit }, { id }) {
    await collections.doc(id).get().then(doc => {
      commit('saveMessage', { post: doc.data() })
    });
  },
  writeUser({ commit }, value) {
    commit('setUser', value)
  }
};
