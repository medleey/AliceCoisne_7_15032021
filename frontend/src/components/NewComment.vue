<template>
<div>
  <div class="border-b">
    <div class="border rounded p-3 mb-4" v-for="comment in comments" v-bind:key="comment.id">
      {{ comment.body }}
    </div>
  </div>
  <form @submit.prevent="subitComment">
    <div class="form-group">
    <h3 class="font-normal texte-grey-darkest text-sm mb-3">Écrivez votre commentaire</h3>
    <textarea class="border rounded p-3 mb-8 w-100" ></textarea>
    </div>
    <button type="submit" class="border rounded py-2"  v-on:click="createComment">Envoyer mon commentaire</button>
    
  </form>
</div>
 <!-- à mettre dans le Post.vue + gestion de cette .vue  v-model="comment.content"-->
</template>

<script type="text/babel">
export default {
  name:'NewComment',
  props: {
      postId: {
        type: Number,
        required: true,
        }
      },
  data () {
    return {
      comment: '',
      comments: this.dataComments, 
    }
  },
  methods: {
      createComment() {
        const CommentData = new FormData();
        if (this.comment.content) {
          CommentData.append("userId", storage.getStorage("userId"));
          }
          CommentData.append("content", this.comment.content);
          if (this.running == true) {
            return;
          } 
          this.running = true;
      },

      submitComment() {
        axios
        .post('http://localhost:3000/api/comments', {
          headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          content: this.comment
      }) .then((result) => {
        console.log(result)
        this.comment.push({
          body: this.comment
        })
        this.comment = ''
      })
    },
  }
} 
</script>

<style>
  h3{
    font-size: 16px;
    margin: none;
  }
</style>