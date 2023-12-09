<template>
  <Header />
  <nav class="bg-primary text-white d-none d-md-block">
    <div class="container">
      <ul class="d-flex list-unstyled m-0 gap-5 overflow-x-auto">
        <li
          class="py-3 pointer navItem text-nowrap"
          :class="{cur: $route.query.category === item}"
          v-for="item in ['all', ...category]"
          :key="item"
          @click="$router.push({path: $route.path, query: {category: item, page: $route.query.page}})"
        >
          <h1 class="fs-5 mb-0">{{ item === 'all'? '全部' : item }}</h1>
        </li>
      </ul>
    </div>
  </nav>

  <main class="container">
    <ul class="row list-unstyled mt-7 mb-2 mt-md-10 mb-md-4">
      <li
        class="col-6 col-md-3 mb-sm mb-md-9"
        v-for="product in products"
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
  <OrderInfo />
  <Footer />
</template>
<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import OrderInfo from '@/components/OrderInfo.vue';
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
  res.products.forEach(item => {
    !category.value.includes(item.category) && category.value.push(item.category)
  })
  if(route.query.category === 'all') {
    products.value = res.products;
  }else{
    products.value = res.products.filter(item => item.category === route.query.category)
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
</style>
