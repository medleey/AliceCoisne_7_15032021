<template>
  <div id="app" class="form_image">
    
    <Header />
    
    <router-view/>
    <Footer />
    
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*height: 100vh;*/
  margin: 0 auto;
  
}
.form_image {
  background-image: url(https://images.unsplash.com/photo-1520694478166-daaaaec95b69?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80);
}
</style>
