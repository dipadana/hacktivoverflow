<template>
  <b-container class="w-75 border-left">
    <!-- Question Section -->
    <b-row class="p-3">
      <QuestionSection :questiondetail="questionData" @updateResponse="fetchQuestionDetail"/>
    </b-row>

    <!-- Answer Section -->
    <div v-if=" questionData.AnswerId && questionData.AnswerId.length === 0 ? false : true ">
      <h4 class="p-3 mt-3 mb-0">Answer :</h4>
      <b-row v-for="(data,index) in questionData.AnswerId" :key="index"  class="border-top p-3">
        <AnswerSection :answerdetail="data" @updateResponse="fetchQuestionDetail"/>
      </b-row>
    </div>  

    <!-- Your Answer Section -->
    <b-row class="border-top p-3">
      <b-col class="my-4">
        <h4 class="mb-4">Your Answer :</h4>
        <VueEditor v-model="content" />
        <b-button @click="addAnswer()" class="mr-2 mb-5 mt-3" size="" variant="success">Submit</b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import QuestionSection from '@/components/QuestionSection.vue'
import AnswerSection from '../components/AnswerSection.vue'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    QuestionSection,
    AnswerSection,
    VueEditor
  },
  data () {
    return {
      content:'',
      questionData: {}
    }
  },
  methods: {
    addAnswer () {
      this.axios({
        method: 'post',
        url: '/answers',
        data: {
          QuestionId: this.$route.params.id,
          description: this.content
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.successToast(data.message)
          this.fetchQuestionDetail()
          this.content = ''
        })
        .catch(err => {
          this.next('You must be logged in to answer this question!')
        })
    },
    fetchQuestionDetail () {
      this.axios({
        method: 'get',
        url: `/questions/detail/${this.$route.params.id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.questionData = data
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  created () {
    this.fetchQuestionDetail()
  }
}
</script>

<style scope>
.ck-content { height:200px;}
</style>
