<template>
  <div id="app">
    
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
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
 