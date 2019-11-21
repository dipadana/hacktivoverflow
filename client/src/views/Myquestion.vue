<template>
  <b-container>

    <b-row>
      <b-col>
        <b-jumbotron class="p-5 bg-light border mb-0" lead="">
          <h2 class="m-0"><b>My Question</b></h2>
        </b-jumbotron>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="9">
        <QuestionList v-for="(data,index) in questionData" :key="index" :questiondata="data" />
      </b-col>
      <b-col v-if="loginStatus" cols="3">
        <Watchtag/>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'
import Watchtag from '@/components/Watchtag.vue'

export default {
  name: 'searchtag',
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
    fetchQuestionData () {
      this.axios({
        method: 'get',
        url: `/questions/myquestion`,
        headers: {
          authorization: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.questionData = data
      })
      .catch(err => {
        console.logP(err.response.data)
        this.next(err.response.data)
      })
    }
  },
  created () {
    this.fetchQuestionData()
  },
  computed: {
    loginStatus () {
      return this.$store.state.isLogin
    }
  }
}
</script>
