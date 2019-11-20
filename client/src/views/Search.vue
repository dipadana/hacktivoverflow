<template>
  <b-container>

    <b-row>
      <b-col>
        <b-jumbotron class="p-5 bg-light border mb-0" lead="">
          <h2 class="m-0"><b>Search result 'create html'</b></h2>
        </b-jumbotron>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="9">
        <QuestionList />
        <QuestionList />
        <QuestionList />
      </b-col>
      <b-col cols="3">
        <b-list-group class="mt-4">
          <p><b class="pl-1">Watch tag</b></p>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            javascript
            <b-badge variant="primary" pill>14</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            php
            <b-badge variant="primary" pill>2</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            ruby
            <b-badge variant="primary" pill>1</b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>


  </b-container>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'home',
  components: {
    QuestionList
  },
  // data () {
  //   return {

  //   }
  // },
  // created () {
  //   this.$store.dispatch('A_FETCH_QUESTION_LIST')
  // },
  // computed: {
  //   question () {
  //     return this.$store.state.questionList
  //   }
  // }
}
</script>