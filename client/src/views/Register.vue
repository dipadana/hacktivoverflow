<template>
  <b-container class="h-100" style="margin-top:16vh;">
    <b-row class="h-100" align-h="center" align-v="center">
      <b-col cols="6" class="p-5 border bg-light">
        <h3 class="mb-4 font1">Register <span class="text-primary">Hacktivoverflow</span></h3>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <!-- <b-form-group id="input-group-2" label="Topic refrence:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.tags"
              required
              placeholder="javascript, react, angular"
            ></b-form-input>
          </b-form-group> -->

          <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
            <b-form-input
              id="input-3"
              v-model="form.password"
              required
              placeholder="Enter password"
              type="password"
            ></b-form-input>
          </b-form-group>

          <div class="mt-4">
            <b-button type="submit" class="mr-2" variant="success">Register</b-button>
            <b-button type="reset" class="mr-2" variant="danger">Reset</b-button>
            <router-link to="/login"><b-button type="submit" class="mr-2" variant="secondary">Login</b-button></router-link>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        tags: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch('register', { name: this.form.name, email: this.form.email, password: this.form.password })
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>

</style>
