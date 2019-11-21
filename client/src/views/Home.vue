<template>

    <div>
      <b-container v-if="!loginStatus" style="height: 90vh;" class="px-5">
        <b-row class="align-items-center justify-content-center h-100" style="flex-direction:column;">
          <img src="https://image.flaticon.com/icons/svg/1683/1683680.svg" width="200" alt="">
          <div>
            <h1 class="text-center main-title">Welcome in <span class="text-primary">Hacktivoverflow...</span></h1>
            <h5 class="text-center sub-title mt-2">Just hit the search bar, and type your answer!</h5>
            <p class="text-center mt-2"><small>We love people who code.</small></p>
          </div>
        </b-row>
      </b-container>
      <div v-if="loginStatus">
        <b-container>

          <b-row>
            <b-col>
              <b-jumbotron header="Question List" class="p-5 bg-light border mb-0" lead="">
                <router-link to="/addquestion"><b-button class="mt-3" variant="primary">Add Question</b-button></router-link>
              </b-jumbotron>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="9">
              <QuestionList v-for="(data,index) in questionData" :key="index" :questiondata="data" />
            </b-col>
            <b-col cols="3">
              <Watchtag/>
            </b-col>
          </b-row>

        </b-container>
      </div>
    </div>

</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'
import Watchtag from '@/components/Watchtag.vue'

export default {
  name: 'home',
  components: {
    QuestionList,
    Watchtag
  },
  data () {
    return {
      questionData: []
    }
  },
  methods: {
    fetchQuestion () {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/questions'
      })
        .then(({ data }) => {
          this.questionData = data
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  created () {
    this.fetchQuestion()
  },
  computed: {
    loginStatus () {
      return this.$store.state.isLogin
    }
  }
}
</script>


<style scoped>
  .main-title{
    font-family: 'Alata', sans-serif;
  }
  .sub-title{
    font-family: 'Open Sans', sans-serif;
  }
</style>