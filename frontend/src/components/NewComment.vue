<template>
  <div>
    <div class="border-b">
      <div class="border rounded p-3 mb-4" v-for="comment in comments" v-bind:key="comment.id">
        {{ comment.body }}
      </div>
    </div>
    <form @submit.prevent="submitComment">
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
import axios from "axios";

export default {
  name:'NewComment',
   props: [
    'postId',
  ],
  data () {
    return {
      form: {
        'content': '',
        'postId': this.postId
      },
      comments: {}, 
    }
  },
  methods: {
    submitComment(e) {
      e.preventDefault()
      this.form.userId = this.$parent.$parent.user.id
      axios.post('http://localhost:3000/api/comments', this.form, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        }).then((result) => {
        this.$emit('newComment');
        this.form = {
          'content': '',
          'postId': this.postId,
          'userId': this.$parent.$parent.user.id,
        };
      })
    },
    mounted: function(){

    }
  }
} 
</script>

<style>
  h3{
    font-size: 16px;
    margin: none;
  }
</style>