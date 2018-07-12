<template>
  <form action='' @submit.prevent='doSend' class='form'>
    <b-textarea
      v-model='input'
      :disabled='!this.$store.state.user.user.uid'
      @keydown.enter.exact.prevent='doSend'
      placeholder='Message'></b-textarea>
    <b-button type='submit' :disabled='!this.$store.state.user.user.uid' variant='info send-button'>Send</b-button>
  </form>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    doSend() {
      const usr = this.$store.state.user.user
      if (usr.uid && this.input.length) {
        // firebase にメッセージを追加
        firebase.database().ref('message').push({
          message: this.input,
          name: usr.displayName,
          image: usr.photoURL
        }, () => {
          this.input = ''
        })
      }
    }
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
