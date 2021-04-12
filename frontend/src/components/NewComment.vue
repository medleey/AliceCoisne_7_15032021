<template>
  <div>
    <form @submit.prevent="submitComment">
      <div class="form-group">
        <h3 class="font-normal texte-grey-darkest text-sm mb-3">Écrivez votre commentaire</h3>
        <p class="error-content mb-1" v-if="errors.content">{{errors.content}}</p>
        <textarea v-model="form.content" v-bind:class="{'border-danger':errors.content}" class="border rounded p-3 mb-8 w-100" ></textarea>
      </div>
      <button data-message="envoyez votre commentaire" type="submit" class="border rounded py-2 send-comment">Envoyer mon commentaire</button>
    </form>
  </div>
 <!-- à mettre dans le Post.vue + gestion de cette .vue  v-model="comment.content"-->
</template>

<script type="text/babel">
import axios from "axios";

export default {
  name:'NewComment',
  props: [
    'postId'
  ],
  data () {
    return {
      form: {
        'content': '',
        'postId': this.postId
      },
      errors: {
        content: null
      },
      comments: {}, 
    }
  },
  methods: {
    submitComment(e) {
      e.preventDefault()
      this.form.userId = this.$parent.$parent.user.id
      if(this.form.content.trim() === ''){ //fonction trim = supprime les espaces avant et après le contenu 
        this.errors.content='Le contenu de votre commentaire ne peut être vide';
        return false;
      }
      axios.post('http://localhost:3000/api/comments', this.form, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      }).then((response) => {
        this.$parent.post.comments.push(response.data);
        this.form = {
          'content': '',
          'postId': this.postId,
          'userId': this.$parent.$parent.user.id,
        };
        this.errors.content=null;
      })
    },
  },
} 
</script>

<style>
  h3{
    font-size: 16px;
    margin: none;
  }
  .error-content {
    color: crimson;
    font-style: italic;
    font-size: 14px;
  }
  .send-comment:hover {
    background-color:#E05600;
    color:white;
  }
</style>