<template>
  <div>
    <div class="container title mt-3 mb-4">
      <h1 v-if="user">{{ welcome }}{{ user.firstName }} {{user.lastName}}</h1>
    </div>
    <!-- Ajouter du texte -->
    <div class="container">
      <div class="row">
        <b-form class="col bg-post mb-3" @submit="onSubmit" @reset="onReset" >
          <h2>Exprimez-vous !</h2>
          <b-form-textarea id="textarea" v-model="form.content" placeholder="Écrivez votre statut" rows="3" max-rows="6">
          </b-form-textarea>
  
      <!-- Ajouter une image -->
      <div id="preview" class="mt-3">
        <img v-if="form.imageUrl" :src="form.imageUrl" />
      </div>
        <b-form-file @change="onImageChange"  v-model="form.image" class="mt-3" plain></b-form-file>
        <div class="mt-1 select-file">Fichier sélectionné: {{ image ? image.name : '' }}</div>
        <b-button class="mt-2 send-post navbar-right" variant="outline-primary" type="submit">Publier</b-button>  
      </b-form>
    </div>
    </div>
    
    <!--mettre Post.vue-->
    <Post @refreshallPosts="refreshPosts" v-for="singlePost in allPosts" :key="singlePost.id" :post="singlePost" /> <!--permet de faire la boucle pour afficher tous les posts-->
  </div>
</template>

<script>
import Post from './Post.vue';
import NewComment from './NewComment.vue';
import Comment from './Comment.vue';
import axios from "axios";

export default {
  name: 'Home',
  components:{ Post },
  props: [
    "user"
  ],
  data () {
    return {
      image: null, 
      text: '',
      welcome: "Bienvenue sur le fil d'actualités ",
      form: {
          image: null,
          imageUrl: '',
          text: ''
        },
      allPosts: []
    }
  },
    methods: {
      onImageChange(e) { //permet de faire le preview de l'image téléchargée
        if (e.target.files[0].type.includes("image")) {
          this.form.image = e.target.files[0];
          this.form.imageUrl = URL.createObjectURL(this.form.image);
        }
      },
      onSubmit(event) {
        event.preventDefault()
        console.log(this.form)

      let postData = new FormData();
        if (this.form.imageUrl != "") {
            postData.append("image", this.form.image);
            postData.append("imageUrl", this.form.image.name);
        }
        postData.append("content", this.form.content ? this.form.content : ''); //condition ternaire, si il ya qqch renvoie, sinon chaine vide
        postData.append("userId", this.user.id);

        axios
        .post("http://localhost:3000/api/posts", postData, {
          headers: {
          Authorization: "Bearer " + localStorage.token,
          }
        })
        .then((response) => {
          this.refreshPosts();
          this.form = {
            image: null,
            imageUrl: '',
            text: ''
          };
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.text = '',
        this.image = null
        // Trick to reset/clear native browser form validation state
      },

      refreshPosts() {
        console.log('test');
        axios.get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          }
        })
          .then((response) => {
            this.allPosts = response.data
          })
      },
    },
    mounted: function () { 
      this.refreshPosts();
      this.$emit('refreshUserData');
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  background-color: white;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: lightgray 2px 5px 10px;
}
.title {
  display: flex;
  justify-content: center;
}
h2 {
  font-size: 18px;
  color: #E05600;
}
.bg-post{
  background-color: white;
  box-shadow: lightgray 2px 5px 10px;
  border-radius: 10px;
  padding: 20px;
}
.log-img{
  margin: 20px;
  align-items: center;
}

.select-file {
  font-size: 14px;
}

.send-post {
  color: #E05600;
  border-color: #E05600;
}

#preview>img {
  width: 200px;
  height: 200px;
  object-fit:contain;
}
</style>
