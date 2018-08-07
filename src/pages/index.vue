<template>
  <div id='app'>
    <div class='row'>
      <MainMenu />

      <div class='col-md-9 col-md-offset-3'>
        <div v-if='user && user.uid'>
          <ChatItem />
        </div>
        <div v-else key='logout' class='top'>
          <div class='login-buttons'>
            <h1 class='title'>Chat App</h1>
            <b-button variant='outline-info btn-md btn-google' type='button' @click='googleLogin'>Google Login</b-button>
            <b-button variant='outline-info btn-md btn-twitter' type='button' @click='twitterLogin'>Twitter Login</b-button>
            <b-button variant='outline-info btn-md btn-facebook' type='button' @click='facebookLogin'>Facebook Login</b-button>
          </div>
        </div>
        <div v-if='user && user.uid'>
          <Form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from '@/plugins/firebase'
import ChatItem from '@/components/ChatItem.vue'
import MainMenu from '@/components/MainMenu.vue'
import Form from '@/components/Form.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChatItem,
    MainMenu,
    Form
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('writeUser', user)
    })
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
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
  #app {
    background-color: rgba(0, 0, 0, 0.7);
    min-height: 100vh;
  }
  .container, .col-md-9 {
    padding: 0;
  }
  .main-menu {
    background: #1a1a1a;
    color: #fff;
    padding: 0 1em;
    z-index: 100;
    @media (min-width: 768px) {
      min-height: 100vh;
      .menu-header {
        position: fixed;
      }
    }
    .header-title {
      line-height: 70px;
    }
    .header-user-info {
      .header-user-image, .header-user-name, button {
        margin: 0 5px;
      }
      .header-user-image {
        border-radius: 20px;
      }
      .header-user-name {
        padding-top: 10px;
      }
      button {
        color: white;
        padding: 10px 0 0;
      }
    }
  }
  .login-buttons {
    padding: 20px 0 30px;
    margin: 70px auto 0;
    border: 1px solid #ccc;
    width: 70%;
    max-width: 360px;
    border-radius: 5px;
    background: white;
    text-align: center;
    .title {
      margin-bottom: 30px;
      color: #1ac2ca;
      font-family: 'Impact';
      font-size: 48px;
    }
    .btn {
      display: block;
      max-width: 300px;
      width: 80%;
      margin: 0 auto 10px;
    }
    .btn-google:hover {
      background: #ea5506;
      border-color: #ea5506;
    }
    .btn-twitter:hover {
      background: #2ca9e1;
      border-color: #2ca9e1;
    }
    .btn-facebook:hover {
      background: #1e50a2;
      border-color: #1e50a2;
    }
  }
</style>
