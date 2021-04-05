<template>
  <div>
    <div class="container title">
      <div class="row">
        <div class="col">
          <h1 class="title-account">Mon compte</h1>
        </div>
      </div>
    </div>

 <div class="container profil w-75 h-100 p-5" >
      <div class="row">
        <div class="col" >
            <h2>Ma photo profil</h2>
            <b-avatar src="https://placekitten.com/300/300" size="5rem" class="mr-2"></b-avatar>
              <b-button class="btn-delete" variant="danger" v-if="this.editInfo">Supprimer</b-button>
        </div>
      </div>
      <div class="row d-flex flex-row">
        <div class="col-12 d-flex" >
            <h2 class="mt-4 mr-2">Mes informations</h2>
        </div>
      </div>
      <div class="col">
        <ul class="pl-0" v-if="!this.editInfo">
            <li>{{user.lastName}}</li>
            <li>{{user.firstName}}</li>
            <li> {{user.service}}</li>
          </ul>

        <ul class="p-0"v-if="this.editInfo">
          <li>
            <b-form-group id="input-group-5" label="Service" label-for="input-5">
              <b-form-select class="input_form"
                id="input-5"
                v-model="form.service"
                :options="service"
                required
              ></b-form-select>
            </b-form-group>
          </li>
        </ul>
        </div>
        <div class="b-col">
          <b-button type="button" class="btn-edit" variant="success" v-if="this.editInfo">Enregistrer</b-button>
          <b-button type="button" class="btn-edit mr-2" variant="success" v-if="!this.editInfo">Modifier</b-button>
          <b-button class="btn-delete" variant="danger" >Supprimer définitivement mon compte</b-button>
        </div>
      </div>

             
 </div>

</template>

<script>
import axios from "axios";
export default {
  name:'Account',
  props: [
    "user"
  ],
  data () {
    return {   
      form: {
        lastName: '',
        name: '',
        password:'',
        service: null,
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
  mounted: function () { //permet de refresh les users data, API > BDD > UserId 
    this.$emit('refreshUserData');
    },
}

</script>

<style>
.title {
  display: flex;
  justify-content: center;
}

.title-account {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  background-color: white;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: lightgray 2px 5px 10px;
}

h2 {
  font-size: 20px;
  color: rgb(29, 86, 172);
}

.profil {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: lightgray 2px 5px 10px;
}
.btn-edit {
  background-color: transparent;
  border-color: green;
  color: green;
  font-size: 14px;
}
.btn-delete {
  background-color: transparent;
  border-color: crimson;
  color: crimson;
  font-size: 14px;
}
li {
  list-style: none;
}

</style>


 <!-- <div class="container profil">
      <div class="row">
        <div class="col-8">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2>Modifier ma photo profil</h2>
              </div>

              <div class="col-4">
                <b-avatar src="https://placekitten.com/300/300" size="6rem"></b-avatar>
              </div>
              
              <div class="col-6">
                <div class="row gap-2"> 
                  <div class="col-6">
                    <b-button variant="success">Modifier</b-button>
                  </div>
                  <div class="col-6">
                  <b-button variant="danger">Supprimer</b-button>
                  </div>
                </div>
                
              </div>
                      
            
            </div>
          </div>
        </div>
      </div>
    </div>-->