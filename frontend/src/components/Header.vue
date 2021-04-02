<template>
  <header>
    <div>
      <nav
        class="navbar navbar-expand-sm navbar-dark bg-secondary mb-3 py-0"
      >
        <div class="container">
          <router-link to="/">
            <img src="@/assets/logo.png" alt="groupomania logo" class="gm-logo" />
          </router-link>
        </div>
        <ul class="navbar-nav mr-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link"> Se connecter </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"> S'inscrire </router-link>
          </li>
        </ul>
        <!--Pour le header lorsque l'on est connecté-->
        <ul class="navbar-nav mr-auto" v-if="user">
          <li class="nav-item mt-2 pr-2 name-user">
            {{user.firstName}} {{user.lastName}}
          </li>
          <li class="nav-item">
            <router-link to="/account" class="nav-link"> Mon compte </router-link>
          </li>
          
            <li class="nav-item nav-link">
            <a @click="logout" class="logout-btn">
              Déconnexion 
               </a>
            </li>
         
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: [
    "user"
  ],
  
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
      this.$emit('refreshUserData');
    }
  }
}


</script>

<style scoped>
  .gm-logo {
      width: 150px;
  }
  .container {
    width: 50%;
  }
  img {
    width: 150px;
  }
  .name-user {
    color: white ;
  }
  .gm-banner {
      background-color: grey;
  }
  .logout-btn {
    cursor: pointer;
    list-style: none;
    color:white ;
  }
</style>
