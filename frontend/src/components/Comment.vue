<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex mb-3">
        <b-list-group-item class='name-user p-0'>
        <b-avatar href="#foo" size="3rem" variant="primary" :src="this.comment.User.profilPicture" class="align-baseline"></b-avatar>
        
        </b-list-group-item>
        <div class="p-1 ml-2 comment-user">
            <p class="mb-0"><b>{{this.comment.User.firstName}} {{this.comment.User.lastName}}</b>
            <button class="delete-btn" @click="deleteOneComment"><i class="fas fa-times"></i></button>
            </p>
            
            <p class="mb-0">{{this.comment.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Comment',
  data () {
    return { 
    }
  },
  props: [
      "comment"
  ],
 methods: {
   deleteComment
 }
} 
</script>
    
<style>
    .comment-user {
        background-color: white;
        box-shadow: lightgray 2px 2px 5px;
        border-radius: 10px;
    }
</style>