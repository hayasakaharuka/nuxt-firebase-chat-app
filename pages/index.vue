<template>
  <div id='app'>
    <header class='header'>
      <h1 class='header-title'>Chat App</h1>
      <div v-if='user && user.uid' key='login' class='header-user-info'>
        <img class='header-user-image' :src='user.photoURL' width='40' height='40'>
        <p class='header-user-name'>{{ user.displayName }}</p>
        <b-button variant='primary btn-sm' type='button' @click='doLogout'>ログアウト</b-button>
      </div>
      <div v-else key='logout' class='header-login'>
        <b-button variant='info btn-sm' type='button' @click='doLogin'>ログイン</b-button>
      </div>
    </header>

    <div v-if='user && user.uid'>
      <ChatItem />
    </div>
    <Form />
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import ChatItem from '@/components/ChatItem.vue'
import Form from '@/components/Form.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChatItem,
    Form
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('writeUser', user)
    })
  },
  methods: {
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    doLogout() {
      firebase.auth().signOut()
      this.$store.dispatch('writeUser', {})
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang='scss' scoped>
  * {
    margin: 0;
    box-sizing: border-box;
  }
  .header {
    background: #00608d;
    color: #fff;
    height: 70px;
    margin-bottom: 1em;
    padding: 0 1em;
    position: fixed;
    width: 100%;
    z-index: 100;

    .header-title {
      line-height: 70px;
    }

    .header-login {
      position: absolute;
      right: 1em;
      top: 20px;
    }

    .header-user-info {
      position: absolute;
      right: 1em;
      top: 15px;

      .header-user-image, .header-user-name, button {
        display: inline-block;
        margin: 0 5px;
      }

      .header-user-image {
        border-radius: 20px;
      }
    }
  }
</style>
