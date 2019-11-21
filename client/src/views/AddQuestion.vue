<template>
  <b-container>
    <p class="h2 mt-5 mb-4">Your Question</p>
    <b-form @submit.prevent="postQuestion()">
      <b-form-group>
        <b-form-input v-model="title" placeholder="Question Title" required></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="tags" placeholder="Tag. example: java, ruby" required></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <VueEditor v-model="content" />
        </b-col>
      </b-row>
      <b-button type="submit" class="mr-2 mt-3" size="" variant="success">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from '../api/server'

export default {
  data () {
    return {
      content: '',
      title: '',
      tags: ''
    }
  },
  components: {
    VueEditor
  },
  methods: {
    postQuestion () {
      this.axios({
        method: 'post',
        url: '/questions',
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
          this.successToast('Question created.')
          this.$router.push({ path: `/question/${data._id}` })
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  }
}
</script>

<style>

</style>
