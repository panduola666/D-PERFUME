<template>
  <footer class="bg-primary py-4">
    <div class="container d-flex align-items-center justify-content-between">
        <div class="flex-grow-1 flex-md-grow-0 d-flex align-items-center justify-content-between gap-4 text-white">
          <img src="../assets/img/logo_white.png" alt="logo">
          <small>© 2020. All Rights Reserved.</small>
        </div>
        <ul class="list-unstyled d-none d-md-flex text-white m-0 fs-5">
          <li class="ms-7 pointer navItem" v-for="item in linkList" :key="item.routeName" @click="toLink(item.route)">{{ item.routeName }}</li>
        </ul>
    </div>
  </footer>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from '../mixin/Swal.js'

const linkList = ref([
  {
    route: '/product?page=1&category=all',
    routeName: 'Product'
  },
  {
    route: '',
    routeName: 'Blog'
  },
  {
    route: '',
    routeName: 'Contact'
  }
])

const router = useRouter()
function toLink(link) {
  if(!link) {
    Swal('功能未實作')
    return
  }
  router.push(link)
}
</script>
<style lang="scss" scoped>
.navItem:hover{
  transform: translateY(-2px);
}
</style>