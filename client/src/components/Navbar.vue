<template>
  <div class="sticky-top">
    <div style="height:5px;" class="bg-primary" ></div>
    <b-navbar toggleable="lg" type="dark" class="shadow-sm" style="background-color: #f2f2f2; border:10px;">
      <img src="https://image.flaticon.com/icons/svg/1683/1683680.svg" width="30" class="ml-3" >
      <router-link to="/"><b-navbar-brand class="nav-title ml-2 main-title text-primary">
        Hacktivoverflow
      </b-navbar-brand></router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/myquestion"> <span class="text-primary">Myquestion</span> </b-nav-item>
        <b-nav-item to="/myanswer"> <span class="text-primary">Myanswer</span> </b-nav-item>
      </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="toSearch()">
            <b-form-input v-model="searchKey" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button variant="primary" size="sm" class="my-2 my-sm-0 mr-2" type="submit" >Search</b-button>
          </b-nav-form>
          <router-link v-if="!$store.state.isLogin" to="/login"><b-button variant="success" size="sm" class="my-2 my-sm-0 mr-2">Login</b-button></router-link>
          <router-link v-if="$store.state.isLogin" to="/addquestion"><b-button size="sm" class="my-2 my-sm-0 mr-2">Question?</b-button></router-link>
          <b-button v-if="$store.state.isLogin" @click.prevent="logout()" size="sm" class="my-2 my-sm-0 mr-2">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'navbar',
  data(){
    return{
      searchKey: ''
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('CHANGE_LOGIN', false)
      this.$store.commit('LOGIN_NAME_CHANGE', null)
      this.successToast('Logout successfuly!')
      this.$router.push({ path: '/' })
    },
    toSearch () {
      this.$router.push({ path: `/search/${this.searchKey}` })
    }
  }
}
</script>

<style>
  .nav-title{
    font-weight: bold;
    margin-left: 15px;
  }
  .main-title{
    font-family: 'Alata', sans-serif;
  }
</style>
