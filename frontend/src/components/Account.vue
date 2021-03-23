<template>
  <div>
    <div class="container title">
      <div class="row">
        <div class="col">
          <h1>Mon compte</h1>
        </div>
      </div>
    </div>

 <div class="container profil w-75 h-100 p-5" >
      <div class="row">
        <div class="col" >
            <h2>Modifier ma photo profil</h2>
            <b-avatar src="https://placekitten.com/300/300" size="5rem" class="mr-2"></b-avatar>
              <b-button type="button" class="btn-edit mr-2" variant="success">Modifier</b-button>
              <b-button class="btn-delete" variant="danger">Supprimer</b-button>
        </div>
      </div>
      <div class="row d-flex flex-row">
        <div class="col-12 d-flex" >
            <h2 class="mt-4 mr-2">Modifier mes informations</h2>
            <b-button type="button" class="btn-edit align-self-end" variant="success">Modifier</b-button>
        </div>
      </div>
      <div class="col">
        <ul class="pl-0">
            <li>{{lastName}}a</li>
            <li>{{Name}}b</li>
            <li>{{password}}c</li>
            <li>
              <b-form-group id="input-group-3" label="Service" label-for="input-3"> 
                <b-form-select class="input_form w-50"
                  id="input-3"
                  v-model="form.service"
                  :options="services"
                  required
                ></b-form-select>
              </b-form-group>
            </li>
          </ul>
        </div>
        <div class="b-col">
          <b-button class="btn-delete" variant="danger">Supprimer définitivement mon compte</b-button>
        </div>
      </div>
 </div>

</template>

<script>
export default {
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
  }
}

</script>

<style>
.title {
  display: flex;
  justify-content: center;
}

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