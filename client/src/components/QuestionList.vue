<template>
  <div @click="toDetail(questiondata._id)" style="cursor:pointer;">
      <b-row align-v="center" no-gutters class="p-3 border-bottom">
        <b-col md="1" class="">
          <p class="text-center m-1 p-1"> {{ votes }} <br>votes</p>
        </b-col>
        <b-col md="1">
          <p class="text-center m-1 p-1"> {{ questiondata.AnswerId.length }} <br>answer</p>
        </b-col>
        <b-col md="1">
          <p class="text-center m-1 p-1"> {{ questiondata.views }} <br>views</p>
        </b-col>
        <b-col md="9" class="font-weight-bold text-break pl-4">
          <p class="mb-1"> {{ questiondata.title }} </p>
          <b-badge v-for=" (data,index) in questiondata.tags" :key="index" class="mr-2" variant="secondary"> {{ data }} </b-badge>
        </b-col>
      </b-row>
  </div>
</template>

<script>
export default {
  name: 'questionlist',
  props: {
    questiondata: Object
  },
  data () {
    return {
      votes: this.questiondata.upvotes.length - this.questiondata.downvotes.length
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/question/${id}`)
    }
  }
}
</script>

<style>

</style>
