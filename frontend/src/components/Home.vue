<template>
  <div class="hello">
    <div class="container">
    <h1>Bienvenu {{user}}</h1>
    </div>
    <!-- Ajouter du texte -->
    <div class="row">
      <div class="col-8 bg-post">
    <h2>Exprimez-vous !</h2>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Écrivez votre statut"
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text }}</pre>
  
    <!-- Ajouter une image -->
    <b-form-file v-model="file1" class="mt-3" plain></b-form-file>
    <div class="mt-3 select-file">Fichier sélectionné: {{ file1 ? file1.name : '' }}</div> 
    <b-button class="send-post navbar-right" variant="outline-primary">Publier</b-button>  
    </div>
    </div>
    
  <!--mettre Post.vue-->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      file1: null,
      user: 'John Doe',
      text: ''
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
.container {
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
  margin: 20px;
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
