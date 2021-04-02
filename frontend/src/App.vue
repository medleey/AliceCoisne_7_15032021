<template>
  <div id="app">
    
    <Header @refreshUserData = "refreshUserData" v-bind:user="user"/> <!-- 1er user = user du header et le 2ème= celui du data en dessous-->
    
    <router-view @refreshUserData = "refreshUserData" v-bind:user="user"/>  <!--évenement qui est référé dans data-->
    <!--
    router-view = soit :
    <Home @refreshUserData = "refreshUserData" v-bind:user="user" /> 
    <Account @refreshUserData = "refreshUserData" v-bind:user="user"/>
    <Login @refreshUserData = "refreshUserData" v-bind:user="user"/>
    <Register @refreshUserData = "refreshUserData" v-bind:user="user"/>
    -->
    <Footer />
    
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import axios from 'axios';
export default {
  data() {
    return {
      user: ''
    }
  },
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    refreshUserData () {
      if(localStorage.userId) { 
        axios
        .get("http://localhost:3000/api/users/" + localStorage.userId, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          }
        })
        .then((response) => {
          this.user = response.data.user
        })
      } else {
        this.user = undefined;
      }
    }
  },
  mounted: function () { 
    this.refreshUserData();
  }, 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
 