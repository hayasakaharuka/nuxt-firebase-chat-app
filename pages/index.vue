<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">Chat App</h1>
      <div v-if="user.uid" key="login" class="header-user-info">
        <img class="header-user-image" :src="user.photoURL" width="40" height="40">
        <p class="header-user-name">{{ user.displayName }}</p>
        <b-button variant="primary btn-sm" type="button" @click="doLogout">ログアウト</b-button>
      </div>
      <div v-else key="logout">
        <button class="primary" type="button" @click="doLogin">ログイン</button>
      </div>
    </header>

    <!-- Firebase から取得したリストを描画（トランジション付き） -->
    <transition-group name="chat" tag="div" class="list content">
      <section v-for="{ key, name, image, message } in chat" :key="key" class="item">
        <div class="item-image"><img :src="image" width="40" height="40"></div>
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message"/>
          </div>
        </div>
      </section>
    </transition-group>

    <!-- 入力フォーム -->
    <form action="" @submit.prevent="doSend" class="form">
      <b-textarea
        v-model="input"
        :disabled="!user.uid"
        @keydown.enter.exact.prevent="doSend"
        placeholder="Message"></b-textarea>
      <b-button type="submit" :disabled="!user.uid" variant="info send-button">Send</b-button>
    </form>
  </div>
</template>

<script>
// firebase モジュール
import firebase from '@/plugins/firebase'
// 改行を <br> タグに変換するモジュール
import Nl2br from 'vue-nl2br'
export default {
  components: { Nl2br },
  data() {
    return {
      user: {},  // ユーザー情報
      chat: [],  // 取得したメッセージを入れる配列
      input: ''  // 入力したメッセージ
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      const ref_message = firebase.database().ref('message')
      if (user) {
        this.chat = []
        // message に変更があったときのハンドラを登録
        ref_message.limitToLast(10).on('child_added', this.childAdded)
      } else {
        // message に変更があったときのハンドラを解除
        ref_message.limitToLast(10).off('child_added', this.childAdded)
      }
    })
  },
  methods: {
    // ログイン処理
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut()
    },
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    },
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(snap) {
      const message = snap.val()
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      })
      this.scrollBottom()
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // firebase にメッセージを追加
        firebase.database().ref('message').push({
          message: this.input,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => {
          this.input = '' // フォームを空にする
        })
      }
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

    .header-title {
      line-height: 70px;
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
  .content {
    margin: 0 auto;
    padding: 0 10px;
    max-width: 600px;
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
  .send-button {
    height: 3em;
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