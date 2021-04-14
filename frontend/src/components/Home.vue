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
          <p class="error-content mb-1"v-if="errors.content">{{errors.content}}</p>
          <b-form-textarea id="textarea" v-model="form.content" v-bind:class="{'border-danger':errors.content}" placeholder="Écrivez votre statut" rows="3" max-rows="6">
          </b-form-textarea>
          <!-- Ajouter une image -->
          <div id="preview" class="mt-3">
              <img v-if="form.imageUrl" :src="form.imageUrl" />
          </div>
          <b-form-file @change="onImageChange" accept="image/jpeg,image/gif,image/png,image/x-eps" v-model="form.image" class="mt-3" plain></b-form-file>
          <div class="mt-1 select-file">Fichier sélectionné: {{ image ? image.name : '' }}</div>
          <b-button aria-label="Publier mon post" class="mt-2 send-post navbar-right" variant="outline-primary" type="submit">Publier</b-button>  
        </b-form>
      </div>
    </div>
    
    <!--mettre Post.vue / permet de faire la boucle pour afficher tous les posts-->
    <Post  
    v-for="singlePost in allPosts" 
    :key="singlePost.id" :post="singlePost" 
    v-bind:user="user" @deletePost="deletePost"/>
  </div>
</template>

<script>
import Post from './Post.vue';
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
      welcome: "Bienvenue sur le fil d'actualités ",
      form: {
          image: null,
          imageUrl: '',
          content: ''
        },
      allPosts: [],
      errors: {
        content: null
      },
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
      if(this.form.content.trim() === ''){ //fonction trim = supprime les espaces avant et après le contenu 
      this.errors.content='Le contenu de votre post ne peut être vide';
      return false;
      }

      let postData = new FormData();
      if (this.form.imageUrl !== "") {
          postData.append("image", this.form.image);
          postData.append("imageUrl", this.form.image.name);
      }
      postData.append("content", this.form.content ? this.form.content : ''); //condition ternaire, si il ya qqch renvoie, sinon chaine vide
      postData.append("userId", this.user.id);

      axios.post("http://localhost:3000/api/posts", postData, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        }
      })
      .then((response) => {
        response.data.comments = [];
        this.allPosts.unshift(response.data); 
        this.form = {
          image: null,
          imageUrl: '',
          content: ''
        };
      })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.content = ''
      this.image = null
      // Trick to reset/clear native browser form validation state
    },
    refreshPosts() {
      axios.get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          }
        })
        .then((response) => {
          this.allPosts = response.data
        })
    },
    deletePost(postId) {
      this.allPosts = this.allPosts.filter(post => post.id !== postId);
    }
  },
  mounted: function () { 
    this.$emit('refreshUserData');
    this.refreshPosts();
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
.send-post:hover {
  color: white;
  background-color:#E05600;
  border-color: #E05600;
}

#preview>img {
  width: 200px;
  height: 200px;
  object-fit:contain;
}
</style>
