<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartProducts"
      style="width: 100%"
    >
      <el-table-column
        width="55">
        <!--
          element 表格组件自定义列头的时候，如果绑定了数据，则必须使用 template 进行包裹，而且必须设定 slot-scope="scope"
          如果你没有绑定任何数据，则不用这么做
          v-model="checkedAll"
        -->
        <!-- eslint-disable -->
        <el-checkbox
          slot="header"
          slot-scope="scope"
          size="mini"
          v-model="checkedAll"
          >
        </el-checkbox>
        <!-- eslint-enable -->
        <!--
          @change="updateProductChecked"  默认参数：更新后的值
          @change="updateProductChecked(productId, $event)"  123, 原来那个默认参数
            当你传递了自定义参数的时候，还想得到原来那个默认参数，就手动传递一个 $event
         -->
        <template slot-scope="scope">
          <el-checkbox
            size="mini"
            :value="scope.row.isChecked"
            @change="updateProductChecked({
              prodId: scope.row.id,
              checked: $event
            })"
          >
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            controls-position="right"
            :min="1"
            :value="scope.row.count"
            @change="updateProductCount({
              prodId: scope.row.id,
              count: $event
            })"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="小计">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="deleteFromCart(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>已选 <span>{{ checkedTotalCount }}</span> 件商品，总价：<span>{{ checkedTotalPrice }}</span></p>
      <el-button type="danger">结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['checkedTotalCount', 'checkedTotalPrice']),
    checkedAll: {
      get () {
        if (this.cartProducts.length === 0) {
          return false
        }
        return this.cartProducts.every(prod => prod.isChecked)
      },
      set (value) {
        this.updateAllProductsChecked(value)
      }
    }
  },
  methods: {
    ...mapMutations('cart', [
      'updateAllProductsChecked',
      'updateProductChecked',
      'updateProductCount',
      'deleteFromCart'
    ])
  }
}
</script>

<style></style>
