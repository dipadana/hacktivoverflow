<template>
  <div>
    <h2 class="my-4 ml-3"> {{ questiondetail.title }} </h2>
    <b-media>
      <template v-slot:aside>
        <b-container>
          <b-row>
            <b-col>
              <b-img v-if="!upBold" @click="upvotes()" width="40" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25223.svg" class="" alt="placeholder"></b-img>
              <b-img v-if="upBold" @click="upvotes()" width="40" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25649.svg" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="mb-0 text-center"> {{ votes }} </h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img v-if="!downBold" @click="downvotes()" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40" class="" alt="placeholder"></b-img>
              <b-img v-if="downBold" @click="downvotes()" style="cursor:pointer;" src="https://image.flaticon.com/icons/svg/25/25629.svg" width="40" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img v-if="questiondetail.UserId._id == userid" @click="editQuestion()" src="https://image.flaticon.com/icons/svg/1160/1160515.svg" width="20" class="" alt="placeholder" style="cursor:pointer; margin-left:10px; margin-top:10px;"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="m-auto">
              <b-img v-if="questiondetail.UserId._id == userid" @click="deleteQuestion()" style="cursor:pointer; margin-left:10px; margin-top:10px;" src="https://image.flaticon.com/icons/svg/1632/1632708.svg" width="20" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <p class="mb-0 text-primary"> {{ questiondetail.UserId ? questiondetail.UserId.name : '' }} </p>
      <p class="text-secondary"><small> {{ moment(questiondetail.createdAt).format('dddd, MMMM Do, YYYY') }} </small></p>
      <div v-html="questiondetail.description"></div>
    </b-media>
  </div>
</template>

<script>
export default {
  name: 'questionsection',
  props: {
    questiondetail: Object
  },
  data () {
    return {
      votes: 0,
      upBold: false,
      downBold: false,
      userid: localStorage.getItem('_id')
    }
  },
  created () {
    // console.log(this.questiondetail.downvotes.length)
    // this.votes = this.questiondetail.upvotes.length - this.questiondetail.downvotes.length
  },
  watch: {
    questiondetail () {
      this.votes = this.questiondetail.upvotes.length - this.questiondetail.downvotes.length

      if (this.questiondetail.upvotes.length === 0) {
        this.upBold = false
      } else {
        for (let i = 0; i < this.questiondetail.upvotes.length; i++) {
          if (this.questiondetail.upvotes[i] == localStorage.getItem('_id')) {
            this.upBold = true
          } else {
            this.upBold = false
          }
        }
      }

      if (this.questiondetail.downvotes.length === 0) {
        this.downBold = false
      } else {
        for (let i = 0; i < this.questiondetail.downvotes.length; i++) {
          if (this.questiondetail.downvotes[i] == localStorage.getItem('_id')) {
            this.downBold = true
          } else {
            this.downBold = false
          }
        }
      }

    }
  },
  methods: {
    upvotes () {
      this.axios({
        method: 'patch',
        url: `/questions/upvotes/${this.$route.params.id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('up')
          console.log(data)
          // this.$store.dispatch('A_FETCH_QUESTION_LIST')
          this.$emit('updateResponse')
        })
        .catch(err => {
          console.log(err.response)
          this.next('You must be logged in to vote a question!')
        })
    },
    downvotes () {
      this.axios({
        method: 'patch',
        url: `/questions/downvotes/${this.$route.params.id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('down')
          console.log(data)
          // this.$store.dispatch('A_FETCH_QUESTION_LIST')
          this.$emit('updateResponse')
        })
        .catch(err => {
          console.log(err.response)
          this.next('You must be logged in to vote a question!')
        })
    },
    deleteQuestion () {
      this.axios({
        method: 'delete',
        url: `/questions/${this.$route.params.id}`,
        headers: {
          authorization: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.successToast(data.message)
          this.$router.push({ path:'/' })
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    editQuestion () {
      this.$router.push({ path: `/editquestion/${this.questiondetail._id}` })
    }
  }
}
</script>

<style>

</style>
