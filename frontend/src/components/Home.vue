<template>
  <div>
    <div class="container title mt-3 mb-4">
    <h1>{{ text }}{{user}}</h1>
    </div>
    <!-- Ajouter du texte -->
    <div class="container">
    <div class="row">
      <div class="col bg-post">
    <h2>Exprimez-vous !</h2>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Écrivez votre statut"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
  
    <!-- Ajouter une image -->
    <b-form-file v-model="file1" class="mt-3" plain></b-form-file>
    <div class="mt-1 select-file">Fichier sélectionné: {{ file1 ? file1.name : '' }}</div> 
    <b-button class="mt-2 send-post navbar-right" variant="outline-primary">Publier</b-button>  
    </div>
    </div>
    </div>
    
  <!--mettre Post.vue-->
  <Post />
  <Post />
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  name: 'Home',
  components:{ Post},
  data () {
    return {
      file1: null,
      user: 'John Doe',
      text: "Bienvenue sur le fil d'actualités ",
    }
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
</style>
