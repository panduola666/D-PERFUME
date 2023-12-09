<template>
  <header class="container position-relative">
    <div class="d-flex align-items-center justify-content-between py-2">
      <router-link to="/">
        <img src="../assets/img/logo.png" alt="logo" />
      </router-link>
      <ul class="d-none d-md-flex list-unstyled justify-content-between text-secondary m-0" >
        <li v-for="nav in navList" :key="nav.routeName" class="d-flex align-items-center ms-5 pointer navItem" :class="{active: $route.fullPath === nav.route}" @click="toLink(nav.route)">
            <span class="material-symbols-outlined fill">{{nav.icon}}</span>
            {{nav.routeName}}
            <span v-if="nav.routeName === 'Cart'">(3)</span>
        </li>
      </ul>
      <ul class="d-flex d-md-none list-unstyled justify-content-between text-secondary m-0">
        <li class="position-relative" @click="toLink('')">
          <span class="material-symbols-outlined fill">shopping_cart</span>
          <small class="position-absolute bg-primary text-white rounded-circle px-2 cartNum">3</small>
        </li>
        <li class="ms-5" @click="showMenu = !showMenu">
          <span class="material-symbols-outlined fill">menu</span>
        </li>
      </ul>
    </div>
    <ul v-if="showMenu" class="list-unstyled position-absolute top-100 start-0 end-0 z-3 d-md-none">
      <li class="py-3 bg-gray-deep text-center text-white fs-5 border-bottom border-white" v-for="item in menuList" :key="item" @click="toLink(item.route)">{{ item.routeName}}</li>
    </ul>
  </header>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from '../mixin/Swal.js'

const showMenu = ref(false)
const navList = ref([
  {
    route: '/product?page=1&category=all',
    routeName: 'Product',
    icon: 'store'
  },
  {
    route: '',
    routeName: 'log in',
    icon: 'person'
  },
  {
    route: '/wishlist?page=1&category=all',
    routeName: 'Wishlist',
    icon: 'favorite'
  },
  {
    route: '',
    routeName: 'Cart',
    icon: 'shopping_cart'
  }
])
const menuList = ref([
  {
    route: '/product?page=1&category=all',
    routeName: 'Product'
  },
  {
    route: '/wishlist?page=1&category=all',
    routeName: 'Wishlist'
  },
  {
    route: '',
    routeName: 'Blog'
  },
  {
    route: '',
    routeName: 'Contact'
  },
  {
    route: '',
    routeName: 'log in'
  },
])
const router = useRouter()

function toLink(link) {
  showMenu.value = false
  if(!link) {
    Swal('功能未實作')
    return
  }
  router.push(link)
}
</script>

<style lang="scss" scoped>
.navItem{
  &.active{
    color: $primary;
    border-bottom: 1px solid $primary;
  }
  &:hover{
    color: $primary;
    transform: translateY(-2px);
  }
}
.cartNum{
  font-size: 12px;
  top: -8px;
  right: -10px;
}
</style>