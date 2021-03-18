<template>
  <div class="container"> 
    <div class="row">
    <b-form class="form_register col-md-8" @submit="onSubmit" @reset="onReset" v-if="show">
      <h1 class="title_form"> Pas encore inscrit ? </h1>
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

      <b-form-group id="input-group-2" label="Votre nom" label-for="input-2">
        <b-form-input class="input_form"
          id="input-2"
          v-model="form.name"
          placeholder="Entrez votre nom et votre prénom"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Service" label-for="input-3">
        <b-form-select class="input_form"
          id="input-3"
          v-model="form.service"
          :options="services"
          required
        ></b-form-select>
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
      name: 'Register',
    data() {
      return {
        form: {
          email: '',
          name: '',
          service: null,
          checked: []
        },
        services: [{ 
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
  .form_register {
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