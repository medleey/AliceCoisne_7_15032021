<template>
  <div class="container post mt-3 mb-4">
      <div class="row">
          <div class="col">
              <b-list-group-item class='name-user pl-0'>
                  <b-avatar variant="primary" :src="this.post.User.profilPicture" class="align-center"></b-avatar>
                  <span class="pl-1 mt-1"><b>{{this.post.User.firstName}} {{this.post.User.lastName}}</b></span>
                  <button aria-label="supprimer mon post" class="delete-btn" @click="deleteOnePost" v-if="canDelete(this.post)"><i class="fas fa-times"></i></button>
              </b-list-group-item>
              <p class="mb-0 post-content">{{this.post.content}}</p>
            
          <b-img v-if="this.post.image" :src="this.post.image" fluid alt="Image du post" class="img-post img-fluid mt-2"></b-img>
          </div>
      </div>
      <p class="date">Publié {{this.date}} </p>
      
      <Comment v-for="singleComment in post.comments" :key="singleComment.id" :comment="singleComment" v-bind:user="user"/>
      <NewComment v-bind:postId="post.id"/>
  </div>
</template>

<script>
import NewComment from './NewComment';
import Comment from './Comment';
import moment from 'moment';
import axios from 'axios';
         
export default {
  data() {
      return{
          date:''
      }   
  },
  components: { 
      NewComment,
      Comment
      },
  props: [
      'post',
      'user'
  ],
  methods:{
    deleteOnePost() {
      axios.delete('http://localhost:3000/api/posts/'+ this.post.id, {
        headers: {
          Authorization: "Bearer " + localStorage.token
        },
        }).then((res) => {
            this.$emit('deletePost', this.post.id); //permet de déclencher l'éven deletePost
        })
    },
    
    canDelete(post) {
        return post.userId+"" === localStorage.userId || this.user.isAdmin; // permet de convertir en string 
    }
  },

  mounted: function () { 
      moment.locale("fr");
      this.date = moment(this.post.createdAt).fromNow()
  }
}
</script>
    
<style>
    .post {
        padding: 10px;
        box-shadow: lightgray 2px 5px 10px;
        border-radius: 10px;
    }
    .list-group-item{
        background-color: unset;
    }
    .post-content{
        font-size:15px;
    }
    .img-post {
        padding: 0px;
    }
    .img-fluid{
        width:100%;
    }
    .name-user {
        font-size:15px;
        border: none;
    }
    .date {
        margin-top: 10px;
        font-size: 13px;
        font-style: italic;
    }
    .delete-btn {
        width: 30px;
        color: red;
        border-width: unset;
        background: unset;
        border: unset
    }
</style>