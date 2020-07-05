import axios from 'axios'
const state = {
  products: []
}
const getters = {}
const mutations = {
  setAllProducts (state, products) {
    state.products = products
  }
}
const actions = {
  async getAllProducts ({ commit }) {
    const { data } = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/products'
    })
    commit('setAllProducts', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
