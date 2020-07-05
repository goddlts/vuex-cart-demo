const state = {
  cartProducts: []
}
const getters = {}
const mutations = {
  addToCart (state, product) {
    // 判断 cartProducts 中是否已有该商品
    // 如果有的话，把 product 添加到数组中，设置 count=1, isChecked=true, totalPrice
    // 否则的话找到购物车中的商品让 count + 1
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.price * prod.count
    } else {
      state.cartProducts.push({
        // { id, title, price }
        ...product,
        totalPrice: product.price,
        count: 1,
        isChecked: true
      })
    }
  }
}
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
