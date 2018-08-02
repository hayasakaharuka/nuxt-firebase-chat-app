<template>
  <div class='main-menu col-sm-12 col-md-3'>
    <div class='menu-header'>
      <h2 class='header-title'>Chat App</h2>
      <div v-if='user && user.uid' key='login' class='header-user-info'>
        <img class='header-user-image' :src='user.photoURL' width='40' height='40'>
        <p class='header-user-name'>{{ user.displayName }}</p>
        <div class='action-menu'>
          <b-button variant='link btn-sm' type='button' @click='doLogout'>Log out</b-button>
        </div>
      </div>
    </div>
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
      color: #1ac2ca;
      font-family: 'Impact';
      font-size: 48px;
    }
    .header-user-info {
      font-weight: bold;
      .header-user-image, .header-user-name, button {
        margin: 0 5px;
      }
      .header-user-image {
        border-radius: 20px;
      }
      .header-user-name {
        padding-top: 10px;
      }
      .action-menu {
        border-top: 3px solid #1ac2ca;
        margin-top: 24px;
        button {
          color: white;
          font-weight: bold;
          padding: 10px 0 0;
        }
      }
    }
  }
</style>
