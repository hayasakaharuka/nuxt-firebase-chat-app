<template>
  <div id='app'>
    <header class='header'>
      <h1 class='header-title'>Chat App</h1>
      <div v-if='this.$store.state.user.user.uid' key='login' class='header-user-info'>
        <img class='header-user-image' :src='this.$store.state.user.user.photoURL' width='40' height='40'>
        <p class='header-user-name'>{{ this.$store.state.user.user.displayName }}</p>
        <b-button variant='primary btn-sm' type='button' @click='doLogout'>ログアウト</b-button>
      </div>
      <div v-else key='logout' class='header-login'>
        <b-button variant='info btn-sm' type='button' @click='doLogin'>ログイン</b-button>
      </div>
    </header>

    <div v-if='this.$store.state.user.user.uid'>
      <ChatItem />
    </div>
    <Form />
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import ChatItem from '@/components/ChatItem.vue'
import Form from '@/components/Form.vue'

export default {
  components: {
    ChatItem,
    Form
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      const loginUser = user ? user : this.$store.state.user.user
      this.$store.dispatch('user/writeUser', loginUser)
    })
  },
  methods: {
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    doLogout() {
      firebase.auth().signOut()
      this.$store.dispatch('user/writeUser', {})
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    }
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
  .form {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: #f5f5f5;
  }
  .form textarea {
    border: 1px solid #ccc;
    border-radius: 2px;
    font-weight: bold;
    height: 3em;
    line-height: 3em;
    padding: 0 .5em;
    resize: none;
    width: calc(100% - 6em);

    &::placeholder {
      color: lightgray;
    }
  }
  .send-button {
    height: 3em;
  }
</style>
