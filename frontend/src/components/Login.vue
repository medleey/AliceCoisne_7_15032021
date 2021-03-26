<template>
  <div class="container">
    <p v-if="$route.params.validRegister">Vous êtes bien inscrit, veuillez-vous connecter :)</p>
    <div class="row">
        <b-form class="form_login col-md-12" @submit="onSubmit" @reset="onReset" v-if="show">
          <h1 class="title_form"> Identifiez-vous </h1>
          <b-form-group 
            id="input-group-1"
            label="Votre adresse mail professionnelle"
            label-for="input-1"
            description="Nous ne partageons pas vos données."
          >
            <b-form-input class="input_form"
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Votre email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Mot de passe" label-for="input-2">
            <b-form-input class="input_form"
              id="input-2"
              v-model="form.password"
              type= "password"
              placeholder="Entrez votre mot de passe"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Envoyer</b-button>
          <b-button type="reset" variant="danger">Annuler</b-button>
        </b-form>
  </div>
  </div>    
</template>

<script>
import axios from 'axios';
  export default {
      name: 'Login',
      data() {
      return {
        form: {
          email: this.$route.params.emailUser, //permet de récupérer l'email du nouvel utilisateur à partir de la page 'register'
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        console.log(this.form)

      axios
          .post("http://localhost:3000/api/users/login", this.form)
          .then((response) => {
            localStorage.token = response.data.token; 
            this.$router.push({
              name: 'Home'
            });
        }).catch((error) => {
          this.error = error.response.data
        })
      },

      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
        this.show = true
        })
      }
    }}
</script>

<style>
  .form_login {
    margin-bottom: 20px;
    padding: 30px;
    font-size: 18px;
    box-shadow: lightgray 2px 5px 10px;
    border-radius: 10px;
    background-color: white;
  }
  .title_form{
    text-align: center;
    color: #E05600;
    font-size: 25px;
    font-weight: bold;
  }
  .input_form {
      font-size: 15px;
  }
</style>