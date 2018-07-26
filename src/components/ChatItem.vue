<template>
  <transition-group name='chat' tag='div' class='list content'>
    <section v-for='{ id, name, image, message } in chat' :key='id' class='item'>
      <div class='item-image'><img :src='image' width='40' height='40'></div>
      <div class='item-detail'>
        <div class='item-name'>{{ name }}</div>
        <div class='item-message'>
          <nl2br tag='div' :text='message'/>
        </div>
      </div>
      <nuxt-link :to="`/messages/${id}`" class="btn btn-dark btn-sm">詳細</nuxt-link>
    </section>
  </transition-group>
</template>

<script>
import firebase from '@/plugins/firebase'
import Nl2br from 'vue-nl2br'
import { mapGetters } from 'vuex'

export default {
  components: {
    Nl2br
  },
  data() {
    return {
      chat: []
    }
  },
  created() {
    const db = firebase.firestore().collection('messages');
    if (this.user) {
      db.orderBy('created_at', 'asc').onSnapshot(querySnapshot => {
        this.chat = [];
        querySnapshot.forEach((doc) => {
          this.chat.push(Object.assign({ id: doc.id }, doc.data()));
          this.scrollBottom()
        })
      })
    }
  },
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang='scss' scoped>
  .content {
    margin: 0 auto;
    padding: 40px 10px 30px;
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
