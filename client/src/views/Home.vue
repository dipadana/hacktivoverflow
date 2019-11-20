<template>

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
          <QuestionList />
          <QuestionList />
          <QuestionList />
        </b-col>
        <b-col cols="3">
          <b-list-group class="mt-4">
            <p><b class="pl-1">Watch tag</b></p>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              javascript
              <b-badge v-if="!editTag" variant="primary" pill>14</b-badge>
              <b-badge v-if="editTag" variant="danger" pill>X</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
              php
              <b-badge v-if="!editTag" variant="primary" pill>2</b-badge>
              <b-badge v-if="editTag" variant="danger" pill>X</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
              ruby
              <b-badge v-if="!editTag" variant="primary" pill>1</b-badge>
              <b-badge v-if="editTag" variant="danger" pill>X</b-badge>
            </b-list-group-item>

            <b-list-group-item v-if="editTag" class="d-flex justify-content-between align-items-center">
              <b-form-select v-model="selected" :options="options" size="sm"></b-form-select>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <b-button size="sm" @click="showEdit()" v-if="editTag" variant="secondary" class="my-2 my-sm-0 mr-2">Edit</b-button>
              <b-button size="sm" @click="showEdit()" v-if="!editTag" variant="primary" class="my-2 my-sm-0 mr-2">Edit Watch tag</b-button>
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
  data () {
    return {
      editTag: false,
      selected: null,
      options: [
        { value: null, text: 'Select tag' },
        { value: 'a', text: 'This is First option', count: 10 },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  },
  methods: {
    showEdit () {
      this.editTag = !this.editTag
      console.log(this.selected)
    }
  }
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
