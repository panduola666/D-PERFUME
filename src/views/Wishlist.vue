<template>
  <Header />
  <nav class="bg-primary text-white">
    <h1 class="container fs-2 py-2">我的收藏</h1>
  </nav>
  <main class="container" v-if="favorite.length">
    <ul class="row list-unstyled mt-7 mb-2 mt-md-10 mb-md-4">
      <li
        class="col-6 col-md-4 mb-sm mb-md-9"
        v-for="product in favorite"
        :key="product.id"
      >
        <div class="card border-0">
          <div class="overflow-hidden">
            <img
              :src="product.image"
              class="card-img-top rounded-0 object-fit-cover productImg pointer"
              :alt="product.title"
            />
          </div>
          <div class="card-body p-0">
            <h2 class="card-title h5 fw-semibold mb-0">{{ product.title }}</h2>
            <div class="card-text">
              {{ product.category }}
              <p class="mb-0">
                NT${{ product.price }}
                <del
                  class="text-secondary"
                  v-if="product.price !== product.origin_price"
                  >NT${{ product.origin_price }}</del
                >
              </p>
            </div>
            <div class="text-primary">
              <span class="material-symbols-outlined pointer me-2" :class="{fill: isFavorite(product.id)}" @click="toggleFavorite(product)"
                >favorite</span
              >
              <span class="material-symbols-outlined fill pointer"
                >shopping_cart</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center fs-5 mb-7 mb-md-9">
      <li class="page-item" v-for="i in 1" :key="i">
        <router-link :to="{path: $route.path,query: {page: i, category:$route.query.category}}" :class="`page-link border-0 rounded-0  text-${+$route.query.page === i ? 'primary' : 'black'} border-bottom${+$route.query.page === i ? '' : '-0'} border-primary `">{{i}}</router-link>
      </li>
    </ul>
  </nav>
  </main>
  <main class="container my-10" v-else>
    <div class="text-center py-10 mb-5 bg-primary-subtle">
    <h2 class="mb-7 h1 fw-semibold">當前沒有收藏</h2>
    <router-link to="/product?page=1&category=all" class="btn btn-primary btn-lg px-8">快來選購</router-link>
  </div>
  <h3>推薦商品</h3>
  <ul class="list-unstyled row">
    <li class="col-12 col-md-3 mb-3" v-for="item in products.slice(0, 4)" :key="item.id">
      <div class="card">
        <img :src="item.image" class="card-img-top object-fit-cover" :alt="item.title" height="300">
        <div class="card-body p-2">
          <h5 class="card-title mb-0">{{ item.title }}<small>[{{item.category}}]</small></h5>
          <p class="mb-2">
                NT${{ item.price }}
                <del
                  class="text-secondary"
                  v-if="item.price !== item.origin_price"
                  >NT${{ item.origin_price }}</del
                >
              </p>
          <router-link to="" class="btn btn-primary">查看商品</router-link>
        </div>
      </div>
    </li>
  </ul>
  </main>
  <Footer />
</template>
<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import productsApi from '../mixin/api/products';
import Swal from '../mixin/Swal.js'
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const products = ref([]);
const category = ref([])
const favorite = ref(JSON.parse(localStorage.getItem('favorite')) || [])
const route = useRoute();
onMounted(async () => {
  init()

});
watch(() => route.query.category,async () => init())
async function init() {
  const res = await productsApi();
  favorite.value.forEach(item => {
    !category.value.includes(item.category) && category.value.push(item.category)
  })
  if(route.query.category === 'all') {
    products.value = res.products;
  }else{
    favorite.value = res.products.filter(item => item.category === route.query.category)
  }
}

function toggleFavorite(item) {
  favorite.value = JSON.parse(localStorage.getItem('favorite')) || []
  const index = favorite.value.findIndex(data => data.id === item.id)
  if(index !== -1) {
    favorite.value.splice(index, 1)
    Swal('已移出我的收藏')
  }else{
    favorite.value.push(item)
    Swal('已加入我的收藏')
  }
  localStorage.setItem('favorite', JSON.stringify(favorite.value))
}
function isFavorite(id) {
  return favorite.value.some(data => data.id === id)
}

</script>
<style lang="scss" scoped>
.navItem{
  &.cur{
    text-decoration: underline;
  }
  &:hover {
    transform: translateY(-2px);
  }
}
.productImg {
  height: 165px;
  transition: transform 1s;
  @media (min-width: 768px) {
    height: 255px;
  }
  &:hover{
    transform: scale(1.1);
  }
}
.page-link:focus{
  background: none;
  box-shadow: none;
}
.noData{
}
</style>
