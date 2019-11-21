import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/server'
import router from '../router'
import { next, successToast, closeLoading, showLoading } from '../helpers/notif'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: null,
    id: null
  },
  mutations: {
    CHANGE_LOGIN (state, payload) {
      state.isLogin = payload
    },
    CHANGE_USERNAME (state, payload) {
      state.username = payload
    }
  },
  actions: {
    login ({ commit, state }, payload) {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('_id', data._id)
          commit('CHANGE_LOGIN', true)
          commit('CHANGE_USERNAME', data.username)

          successToast('Login successfuly!')
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err.response.data)
          next(err.response.data)
        })
    },
    register ({ commit, state }, payload) {
      axios({
        url: '/users/register',
        method: 'post',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          router.push({ path: '/login' })
          successToast('Register successfuly!')
        })
        .catch(err => {
          console.log(err.response.data)
          next(err.response.data.errors)
        })
    }
  },
  modules: {
  }
})
