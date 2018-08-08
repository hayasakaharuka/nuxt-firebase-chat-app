<template>
  <div>
    <!--<div class='image-upload'>-->
      <!--<h2>画像</h2>-->
      <!--<img v-show='uploadedImage' :src='uploadedImage' />-->
      <!--<input type='file' v-on:change='onFileChange'>-->
    <!--</div>-->
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
import { firebase } from '@/plugins/firebase'
import { mapGetters } from 'vuex'

import axios from 'axios'

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
  },
  methods: {
    doSend() {
      const usr = this.user
      if (usr.uid && this.input.length) {
        let params = new URLSearchParams();
        params.append('name', usr.displayName);
        params.append('text', this.input);
        params.append('image', usr.photoURL);
        axios.post(`${process.env.apiBaseUrl}/addMessage`, params)
        this.input = ''
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
      font-family: 'Tahoma';
    }
  }

  .send-button {
    height: 3em;
    font-family: 'Tahoma';
  }
</style>
