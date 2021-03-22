<template>
  <div class="hello">
    <div class="container mt-3 mb-4">
    <h1>Bienvenu {{user}}</h1>
    </div>
    <!-- Ajouter du texte -->
    <div>
      <div class="col-8 bg-post ">
    <h2>Exprimez-vous !</h2>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Écrivez votre statut"
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-1 mb-0">{{ text }}</pre>
  
    <!-- Ajouter une image -->
    <b-form-file v-model="file1" class="mt-3" plain></b-form-file>
    <div class="mt-1 select-file">Fichier sélectionné: {{ file1 ? file1.name : '' }}</div> 
    <b-button class="mt-2 send-post navbar-right" variant="outline-primary">Publier</b-button>  
    </div>
    </div>
  
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>