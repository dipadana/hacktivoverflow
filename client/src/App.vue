<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Swal from "sweetalert2"
import {CronJob} from "cron"

export default {
  name: "app",
  components: {
    Navbar
  },
  methods: {
    pomodoroTime() {
      new CronJob(
        "0 */25 * * * *",
        function() {
          Swal.fire({
            imageUrl: 'https://image.flaticon.com/icons/svg/465/465897.svg',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            title: '25 minutes have passed.',
            text: 'Take a short break before continuing your work!',
            footer: '<a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">Pomodoro Time?</a>'
          })
        },
        null,
        true,
        "Asia/Jakarta"
      );
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.$store.commit("CHANGE_LOGIN", true);
      this.$store.commit("CHANGE_USERNAME", localStorage.getItem("name"));
      // this.$router.push({path:'/'})
    }

    this.pomodoroTime();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Alata&display=swap");
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
body {
  font-family: "Open Sans", sans-serif !important;
}
.font1 {
  font-family: "Alata", sans-serif;
}
</style>
