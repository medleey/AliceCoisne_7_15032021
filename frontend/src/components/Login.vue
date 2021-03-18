<template>
  
    <div class="container">
      <div class="row">
    <b-form class="form_login col-md-12" @submit="onSubmit" @reset="onReset" v-if="show">
      <h1 class="title_form"> Identifiez-vous </h1>
      <b-form-group 
        id="input-group-1"
        label="Votre adresse mail professionnelle"
        label-for="input-1"
        description="Nous ne partageaons pas vos données."
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
          placeholder="Entrez votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Envoyer</b-button>
      <b-button type="reset" variant="danger">Annuler</b-button>
    </b-form>
    </div>
    </div>    
</template>

<script>
  export default {
      name: 'Login',
      data() {
      return {
        form: {
          email: '',
          password: '',
          checked: []
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
        },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.service = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
        this.show = true
        })
      }
    }
  }
</script>

<style>
  .form_login {
    margin-bottom: 20px;
    padding: 30px;
    font-size: 18px;
    box-shadow: lightgray 2px 5px 10px;
    border-radius: 10px;
    background-color: white;
    opacity: 0.9;
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
