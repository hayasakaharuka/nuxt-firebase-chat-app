<template>
  <div id='app'>
    <div class='row'>
      <MainMenu />

      <div class='col-md-9 col-md-offset-3'>
        <h1>詳細aaa</h1>
        <div v-if='user && user.uid'>
          <img class='header-user-image' :src='post.image' width='40' height='40'>
          <p>{{post.name}}</p>
          <p>{{post.message}}</p>
        </div>
        <nuxt-link to='/' class="btn btn-dark btn-sm">戻る</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from '@/plugins/firebase'
  import MainMenu from '@/components/MainMenu.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      MainMenu
    },
    async asyncData ({ params, store }) {
      await store.dispatch('INIT_SINGLE', params)
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.$store.dispatch('writeUser', user)
      })
    },
    methods: {
      twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithPopup(provider)
      },
      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
      },
      facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(provider)
      },
      doLogout() {
        firebase.auth().signOut()
        this.$store.dispatch('writeUser', {})
      }
    },
    computed: {
      ...mapGetters(['user', 'post'])
    }
  }
</script>

<style lang='scss' scoped>
  .content {
    margin: 0 auto;
    padding: 80px 10px 30px;
    max-width: 600px;
  }

  .list {
    margin-bottom: 100px;
  }

  .item {
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-bottom: 0.8em;
  }

  .item-image img {
    border-radius: 20px;
    vertical-align: top;
  }

  .item-detail {
    margin: 0 0 0 1.4em;
  }

  .item-name {
    font-size: 75%;
  }

  .item-message {
    position: relative;
    display: inline-block;
    font-size: 14px;
    padding: 0.8em;
    background: #deefe8;
    border-radius: 6px;
    line-height: 1.2em;
  }

  .item-message::before {
    position: absolute;
    content: " ";
    display: block;
    left: -16px;
    bottom: 12px;
    border: 4px solid transparent;
    border-right: 12px solid #deefe8;
  }

  /* トランジション用スタイル */
  .chat-enter-active {
    transition: all 1s;
  }

  .chat-enter {
    opacity: 0;
    transform: translateX(-1em);
  }
</style>
