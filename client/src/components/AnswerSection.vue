<template>
  <div>
    <b-media class="pt-3">
      <p class="mb-0"><small class="text-primary"> {{ answerdetail.UserId.name }} </small></p>
      <p class="mb-3 text-secondary"><small> {{ moment(answerdetail.createdAt).format('dddd, MMMM Do, YYYY') }} </small></p>
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
              <b-img v-if="answerdetail.UserId._id == userid" @click="editAnswer()" src="https://image.flaticon.com/icons/svg/1160/1160515.svg" width="20" class="" alt="placeholder" style="cursor:pointer; margin-left:10px; margin-top:10px;"></b-img>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="m-auto">
              <b-img v-if="answerdetail.UserId._id == userid" @click="deleteAnswer()" style="cursor:pointer; margin-left:10px; margin-top:10px;" src="https://image.flaticon.com/icons/svg/1632/1632708.svg" width="20" class="" alt="placeholder"></b-img>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <div v-if="!show" v-html="content"></div>

      <b-col v-if="show" class="ml-0 h-100">
        <VueEditor id="editor1" v-model="content" />
        <b-button @click="updateAnswerProcess()" class="mr-2 mb-5 mt-3" size="" variant="success">Edit answer</b-button>
      </b-col>

    </b-media>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'answersection',
  props: {
    answerdetail: Object
  },
  components: {
    VueEditor
  },
  created () {
    // console.log(this.answerdetail, 'ini data di answer')
    this.votes = this.answerdetail.upvotes.length - this.answerdetail.downvotes.length
  },
  data () {
    return {
      votes: 0,
      show: false,
      upBold: false,
      downBold: false,
      content: this.answerdetail.description,
      userid: localStorage.getItem('_id')
    }
  },
  methods: {
    updateAnswerProcess () {
      this.axios({
        method: 'put',
        url: `/answers/${this.answerdetail._id}`,
        data: {
          description: this.content
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.successToast(data.message)
          this.$emit('updateResponse')
          this.show = false
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    editAnswer () {
      this.show = !this.show
    },
    upvotes () {
      this.axios({
        method: 'patch',
        url: `/answers/upvotes/${this.answerdetail._id}`,
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
        url: `/answers/downvotes/${this.answerdetail._id}`,
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
    deleteAnswer () {
      this.axios({
        method: 'delete',
        url: `/answers/${this.answerdetail._id}/${this.answerdetail.QuestionId}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.successToast(data.message)
          this.$emit('updateResponse')
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  watch: {
    answerdetail () {
      this.votes = this.answerdetail.upvotes.length - this.answerdetail.downvotes.length

      if (this.answerdetail.upvotes.length === 0) {
        this.upBold = false
      } else {
        for (let i = 0; i < this.answerdetail.upvotes.length; i++) {
          if (this.answerdetail.upvotes[i] == localStorage.getItem('_id')) {
            this.upBold = true
          } else {
            this.upBold = false
          }
        }
      }

      if (this.answerdetail.downvotes.length === 0) {
        this.downBold = false
      } else {
        for (let i = 0; i < this.answerdetail.downvotes.length; i++) {
          if (this.answerdetail.downvotes[i] == localStorage.getItem('_id')) {
            this.downBold = true
          } else {
            this.downBold = false
          }
        }
      }
    }
  }
}
</script>

<style>
#editor1 {
  height: 200px;
}
</style>
