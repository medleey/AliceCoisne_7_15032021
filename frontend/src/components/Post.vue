<template>
 <div class="container post mt-3 mb-4">
    <div class="row">
        <div class="col">
            <b-list-group-item class='name-user pl-0'>
                <b-avatar href="#foo" variant="primary" :src="this.post.User.profilPicture" class="align-baseline"></b-avatar>
                {{this.post.User.firstName}} {{this.post.User.lastName}}
            </b-list-group-item> 
                <b-img :src="this.post.image" fluid alt="Responsive image" class="img-post"></b-img>
        
      <p class="date">Publié {{this.date}} </p>
      <p>{{this.post.content}}</p>
        <Comment v-for="singleComment in post.comments" :key="singleComment.id" :comment="singleComment"/>
      <NewComment @newComment="refreshPosts" v-bind:postId="post.id"/>
      </div>
    </div>
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
            date:'',
            allComments: []
        }   
    },
  components: { 
      NewComment,
      Comment
      },
  props: {
      post : Object,
  },
  methods:{
      refreshPage() {
        axios
          .get("http://localhost:3000/api/posts", {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            }
          })
          .then((response) => {
            this.allPosts = response.data
          })
      }
  },

  mounted () {
      moment.locale("fr");
      this.date = moment(this.post.createdAt).fromNow()
  },
  mounted: function () { 
      this.refreshPage();
      this.$emit('refreshUserData');
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
    .img-post {
        padding: 0px;
    }

    .name-user {
        border: none;
    }
    .date {
        margin-top: 10px;
        font-size: 14px;
        font-style: italic;
    }
</style>