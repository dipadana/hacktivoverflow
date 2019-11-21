<template>
  <b-list-group class="mt-4">
    <p><b class="pl-1">Watch tag</b></p>
    <b-list-group-item @click="gotoTagListQuestion(data.text)" v-for="(data,index) in finalTags" :key="index" class="d-flex justify-content-between align-items-center">
      {{ data.text }}
      <b-badge v-if="!editTag" variant="primary" pill> {{ data.count }} </b-badge>
      <b-badge v-if="editTag" variant="danger" pill>X</b-badge>
    </b-list-group-item>

    <b-list-group-item v-if="editTag" class="d-flex justify-content-between align-items-center">
      <b-form-select :required="true" v-model="selected" :options="options" size="sm"></b-form-select>
    </b-list-group-item>

    <b-list-group-item class="d-flex justify-content-between align-items-center">
      <b-button size="sm" @click="addTag()" v-if="editTag" variant="secondary" class="my-2 my-sm-0 mr-2">Add tag</b-button>
      <b-button size="sm" @click="showEdit()" v-if="editTag" variant="primary" class="my-2 my-sm-0 mr-2">back</b-button>
      <b-button size="sm" @click="showEdit()" v-if="!editTag" variant="primary" class="my-2 my-sm-0 mr-2">Add new tag</b-button>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: 'WatchTag',
  data () {
    return {
      editTag: false,
      selected: null,
      options: [],
      mytags: [],
      finalTags: []
    }
  },
  methods: {
    showEdit () {
      this.editTag = !this.editTag
    },
    fetchAllTagData () {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/tags'
      })
        .then(({ data }) => {
          this.options = data
          return this.axios({
            method: 'get',
            url: 'http://localhost:3000/users/tags',
            headers: {
              authorization: localStorage.getItem('access_token')
            }
          })
        })
        .then(({ data }) => {
          this.mytags = data
          for(let i = 0; i < this.options.length; i++ ){
            for(let j = 0; j < this.mytags.length; j++){
              if(this.options[i].text === this.mytags[j]){
                this.finalTags.push(this.options[i])
              }
            }
          }
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    addTag () {
      if(this.selected && this.selected !== null){
        this.axios({
          method: 'patch',
          url: '/users/addtag',
          data: {
            tag: this.selected
          },
          headers: {
            authorization: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            this.successToast('Successfuly add new tag!')
            this.finalTags = []
            this.selected = null
            this.fetchAllTagData()
          })
          .catch(err => {
            console.log(err.response.data)
            this.next(err.response.data)
          })
      }
      else{
        this.showEdit()
      }
    },
    gotoTagListQuestion (tag) {
      this.$router.push({ path:`/tag/${tag}`})
    }
  },
  created () {
    this.fetchAllTagData()
  }
}
</script>

<style>

</style>
