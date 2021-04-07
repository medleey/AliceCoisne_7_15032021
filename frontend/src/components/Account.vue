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
            <b-button type="button" class="btn-edit mr-2" variant="success" v-if="editInfo">Modifier</b-button>
            <b-button class="btn-delete" variant="danger" v-if="editInfo">Supprimer</b-button>
        </div>
      </div>
      <div class="row d-flex flex-row">
        <div class="col-12 d-flex" >
            <h2 class="mt-4 mr-2">Mes informations</h2>
        </div>
      </div>
      <div class="col">
        <ul class="pl-0" v-if="!editInfo">
          <li>{{user.lastName}}</li>
          <li>{{user.firstName}}</li>
          <li> {{user.service}}</li>
        </ul>
        <!--POUR RÉCUPÉRER MES INFOS MODIFIÉES-->
        <form @submit.prevent="submitInfo">
          <ul class="p-0"v-if="editInfo">
            <li>
              <b-form-group id="input-group-1" label="Service" label-for="input-1">
                <b-form-select class="input_form"
                  id="input-1"
                  v-model="form.service"
                  :options="services"
                ></b-form-select>
              </b-form-group>
            </li>
            <li>
              <b-form-group id="input-group-2" label="Votre ancien mot de passe" label-for="input-2">
                <b-form-input class="input_form"
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Entrez votre ancien mot de passe"
                ></b-form-input>
              </b-form-group>
            </li>
            <li>
              <b-form-group id="input-group-3" label="Votre nouveau mot de passe" label-for="input-3">
                <b-form-input class="input_form"
                  id="input-3"
                  v-model="form.password"
                  type="password"
                  placeholder="Entrez votre nouveau mot de passe"
                ></b-form-input>
              </b-form-group>
            </li>
          </ul>
          <div class="b-col">
            <b-button type="submit" class="btn-edit" variant="success" v-if="editInfo">Enregistrer</b-button>
          </div>
        </form>
        <b-button type="button" class="btn-edit mr-2" variant="success" v-if="!editInfo" v-on:click="editInfo = !editInfo">Modifier</b-button>
        <b-button class="btn-delete" variant="danger" @click="deleteUser">Supprimer définitivement mon compte</b-button>
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
      editInfo: false,

      form: {
        currentPassword: '',
        newPassword:'',
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
      show: true,
    }
  },
  methods: {
    submitInfo(e) {
      e.preventDefault()
      axios.put('http://localhost:3000/api/users/'+ localStorage.userId, this.form, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        }).then((res) => {
            this.$emit('refreshUserData');
        })
        .catch(error => {
          console.log(error);
        });
        
    },

    deleteUser() {
      let confirm = window.confirm(
        "Êtes vous sûr.e de vouloir supprimer votre compte ? La suppression est définitive et entrainera la suppression de tous vos posts et commentaires"
      );
      if (confirm) {
        axios
          .delete(
            "http://localhost:3000/api/users/" + storage.getStorage("userId"),
            {
              headers: {
                Authorization: "Bearer " + storage.getStorage("token"),
              },
            }
          )
          .then((response) => {
            if (response) {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }
          })
          .catch((error) => console.log(error));
      }
    },
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


    
            