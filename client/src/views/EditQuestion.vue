<template>
  <b-container>
    <p class="h2 mt-5 mb-4">Edit Question</p>
    <b-form @submit.prevent="editQuestion()">
      <b-form-group>
        <b-form-input v-model="title" placeholder="Question Title" required></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="tags" placeholder="Tag" required></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <VueEditor v-model="content" />
        </b-col>
      </b-row>
      <b-button type="submit" class="mr-2 mt-3" size="" variant="success">Edit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from '../api/server'

export default {
  data () {
    return {
      content: '<h1>Some initial contensdsddt</h1>',
      title: '',
      tags: ''
    }
  },
  components: {
    VueEditor
  },
  methods: {
    editQuestion () {
      console.log('masuk edit')
      this.axios({
        method: 'put',
        url: `/questions/${this.$route.params.id}`,
        data: {
          title: this.title,
          description: this.content,
          tags: this.tags
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.successToast(data.message)
          this.$router.push({ path: `/question/${this.$route.params.id}` })
        })
        .catch(err => {
          console.logP(err.response.data)
          this.next(err.response.data)
        })
    },
    fetchData () {
      this.axios({
        method: 'get',
        url: `/questions/detail/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.title = data.title
          this.content = data.description
          this.tags = data.tags.join(', ')
          console.log(data)
        })
        .catch(err => {
          console.logP(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>

</style>
