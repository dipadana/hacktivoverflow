<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'

// import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('CHANGE_LOGIN', true)
      this.$store.commit('CHANGE_USERNAME', localStorage.getItem('name'))
      // this.$router.push({path:'/'})
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Alata&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
  body{
    font-family: 'Open Sans', sans-serif !important;
  }
  .font1{
    font-family: 'Alata', sans-serif;
  }
</style>
