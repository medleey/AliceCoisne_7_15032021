<template>
  <div class="container"> 
    <div class="row">
      
      <b-form class="form_register col-md-8" @submit="onSubmit" @reset="onReset" v-if="show">
      <h1 class="title_form"> Pas encore inscrit ? </h1>
        <b-form-group
          id="input-group-1"
          label="Votre adresse mail professionnelle"
          label-for="input-1"
          description="Nous ne partageons pas vos données."
        >
          <b-form-input class="input_form"
            id="input-1"
            v-model="form.email"
            type="text"
            placeholder="Votre email"
            required
            :class="error.email ? 'border-red' : ''"
          ></b-form-input>
          <p class="mb-0 error" v-if="error.email">
            {{ error.email }}
          </p>
        </b-form-group>

        <b-form-group id="input-group-2" label="Votre nom" label-for="input-2">
          <b-form-input class="input_form"
            id="input-2"
            v-model="form.lastName"
            placeholder="Entrez votre nom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Votre prénom" label-for="input-3">
          <b-form-input class="input_form"
            id="input-3"
            v-model="form.firstName"
            placeholder="Entrez votre prénom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Votre mot de passe" label-for="input-4">
          <b-form-input class="input_form"
            id="input-4"
            v-model="form.password"
            type="password"
            placeholder="Entrez votre mot de passe"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Service" label-for="input-5">
          <b-form-select class="input_form"
            id="input-5"
            v-model="form.service"
            :options="service"
            required
          ></b-form-select>
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
      name: 'Register',
    data() {
      return {
        form: {
          email: '',
          lastName: '',
          firstName: '',
          service: null
        },
        error: {
          email: false
        },
        service: [{ 
          text: 'Selectionnez votre service', value: null }, 
          'Ressources Humaines',
          'Commerce',
          'Comptabilité',
          'Marketing',
          'Informatique',
          'Design',
          'Bureau des études'
          ],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()

        axios
          .post("http://localhost:3000/api/users/register", this.form)
          .then((response) => {
            //SUCCES 
            this.$router.push({name: 'Login', 
              params:{validRegister: true, 
              emailUser: this.form.email} //permet de renvoyer un msg pour l'inscription
            }); 
        }).catch((error) => {
          this.error = error.response.data;
        });
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.service = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
  }
</script>

<style scoped>
  .form_register {
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
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
  .error {
    color:crimson;
    font-size: 14px;
  }
  .border-red {
    border-color: crimson;
  }
</style>