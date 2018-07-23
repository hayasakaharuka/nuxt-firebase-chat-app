<template>
  <div>
    <div class='image-upload'>
      <h2>画像</h2>
      <img v-show='uploadedImage' :src='uploadedImage' />
      <input type='file' v-on:change='onFileChange'>
    </div>
    <form action='' @submit.prevent='doSend' class='form'>
      <b-textarea
        v-model='input'
        :disabled='checkUser()'
        @keydown.enter.exact.prevent='doSend'
        placeholder='Message'></b-textarea>
      <b-button type='submit' :disabled='checkUser()' variant='info send-button'>Send</b-button>
    </form>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      input: '',
      uploadedImage: ''
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('writeUser', user)
    })
    const cdd = firebase.storage().ref()
    console.log(cdd)
  },
  methods: {
    doSend() {
      const usr = this.user
      if (usr.uid && this.input.length) {
        firebase.database().ref('messages').push({
          message: this.input,
          name: usr.displayName,
          image: usr.photoURL
        }, () => {
          this.input = ''
        })
      }
    },
    checkUser() {
      return !(this.user && this.user.uid)
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
    },
    createImage(file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImage = e.target.result
      };
      reader.readAsDataURL(file)
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang='scss' scoped>
  .form {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    height: 100px;
    width: 75%;
    background: #f5f5f5;
    @media (max-width: 767px) {
      width: 100%;
    }
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
