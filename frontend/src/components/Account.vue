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
            <b-avatar v-if="!editInfo" :src="user.profilPicture" size="5rem" class="mr-2"></b-avatar>
            <b-form-group v-if="editInfo" id="input-group-3" label="Votre nouvelle photo de profil" label-for="input-3">
              <!-- Ajouter une image -->
              <div id="preview" class="mt-3">
                  <img v-if="form.imageUrl" :src="form.imageUrl" alt="prévisualisation de l'image de profil" />
              </div>
              <b-form-file @change="onImageChange" accept="image/jpeg,image/gif,image/png,image/x-eps" v-model="form.image" class="mt-3" plain></b-form-file>
              <div class="mt-1 select-file">Fichier sélectionné: {{ image ? image.name : '' }}</div>
            </b-form-group>
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
          <li>{{user.service}}</li>
        </ul>
        <!--POUR RÉCUPÉRER MES INFOS MODIFIÉES-->
        <form @submit.prevent="submitInfo">
          <ul class="p-0" v-if="editInfo">
            <li>
              <b-form-group id="input-service" label="Service" label-for="services">
                <b-form-select class="input_form"
                  id="services"
                  v-model="user.service"
                  :options="services"
                ></b-form-select>
              </b-form-group>
            </li>
          </ul>
          <div class="b-col">
            <b-button aria-label="enregistrer mes modifications" type="submit" class="mb-2" variant="outline-success" v-if="editInfo">Enregistrer</b-button>
          </div>
        </form>
        <b-button aria-label="modifier mon compte" type="button" class="mr-2 mb-2" variant="outline-success" v-if="!editInfo" v-on:click="editInfo = !editInfo">Modifier</b-button>
        <b-button aria-label="supprimer mon compte" type="button" class="btn-delete mb-2" variant="outline-danger" @click="deleteUser">Supprimer définitivement mon compte</b-button>
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
      image: null,
      editInfo: false,
      form: {
        image: null,
        imageUrl: '',
        currentPassword: '',
        newPassword:''
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
    onImageChange(e) { //permet de faire le preview de l'image téléchargée
        if (e.target.files[0].type.includes("image")) {
          this.form.image = e.target.files[0];
          this.form.imageUrl = URL.createObjectURL(this.form.image);
        }
      },
    submitInfo(e) {
      e.preventDefault();
      let postData = new FormData();
      if (this.form.imageUrl != "") {
        postData.append("image", this.form.image);
        postData.append("imageUrl", this.form.image.name);
      }
      postData.append("userService", this.user.service);
      postData.append("userId", this.user.id);

      axios.put('http://localhost:3000/api/users/'+ localStorage.userId, postData , {
          headers: {
            Authorization: "Bearer " + localStorage.token
          }
        }).then(() => {
          this.$emit('refreshUserData');
          this.editInfo = false;
           this.form = {
            image: null,
            imageUrl: ''
          };
        }).catch(error => console.log(error));
    },
    deleteUser() {
      let confirm = window.confirm(
        "Êtes vous sûr.e de vouloir supprimer votre compte ? La suppression est définitive et entrainera la suppression de tous vos posts et commentaires"
      );
      if (confirm) {
        axios
          .delete(
            "http://localhost:3000/api/users/" + localStorage.userId,
            {
              headers: {
                Authorization: "Bearer " + localStorage.token,
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

<style scoped>
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
li {
  list-style: none;
}
#preview>img {
  width: 200px;
  height: 200px;
  object-fit:contain;
}
</style>


    
            