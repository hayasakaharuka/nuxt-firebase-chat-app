<template>
  <transition-group name='chat' tag='div' class='list content'>
    <section v-for='{ id, name, image, message, created_at } in chat' :key='id' class='item'>
      <div class='item-image'><img :src='image' width='40' height='40'></div>
      <div class='item-detail'>
        <div class='item-info'>
          <div class='item-name'>
            {{ name }}
            <span class='date'>{{$moment(created_at.toDate()).format('YYYY/MM/DD HH:mm:ss')}}</span>
          </div>
          <div class='item-action'>
            <nuxt-link :to="`/messages/${id}`">
              <i class="fa fa-search"></i>
            </nuxt-link>
            <i class="fa fa-trash-o delete-icon" @click='deleteMessage(id)'></i>
          </div>
        </div>
        <div class='item-message'>
          <nl2br tag='div' :text='message'/>
        </div>
      </div>
    </section>
  </transition-group>
</template>

<script>
import { firebase, firestore } from '@/plugins/firebase'
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
    if (this.user) {
      firestore.collection('messages').orderBy('created_at', 'asc').onSnapshot(querySnapshot => {
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
    },
    deleteMessage(id) {
      firestore.collection('messages').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch(error => {
        console.error("Error removing document: ", error);
      });
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
    // display: flex;
    align-items: flex-end;
    margin-bottom: 0.8em;
  }
  .item-image {
    vertical-align: top;
    display: inline-block;
  }
  .item-image img {
    border-radius: 6px;
  }
  .item-detail {
    margin: 0 0 0 1.4em;
    display: inline-block;
    vertical-align: top;
    max-width: calc(100% - 65px);
  }
  .item-info {
    font-size: 75%;
    position: absolute;
    font-weight: bold;
    color: white;
  }
  .item-name {
    vertical-align: top;
    display: inline-block;
    font-size: 14px;
  }
  .item-action {
    display: inline-block;
    font-size: 16px;
    margin-left: 10px;
  }
  .item-message {
    color: white;
    position: relative;
    display: inline-block;
    font-size: 14px;
    padding: 0.8em 0.8em 0.8em 0;
    border-radius: 6px;
    line-height: 1.2em;
    margin: 18px 8px 0 0;
  }
  .date {
    font-size: 10px;
    color: #ececec;
    display: inline-block;
    margin-left: 8px;
  }
  .btn {
    font-weight: bold;
    font-family: 'Tahoma';
    padding: 2px 8px;
  }
  .delete-icon {
    color: white;
    cursor: pointer;
    margin: 0 0 3px 10px;
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
