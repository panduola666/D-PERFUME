<template>
  <Header />
  <div class="banner position-relative mb-7 mb-md-9">
    <section
      class="bannerText text-white position-absolute top-50 translate-middle-y px-3"
    >
      <h1 class="h1 fw-bold m-0">Perfume your day</h1>
      <p class="fs-4 mb-3">
        A perfume is like a piece of clothing, a message, a way of presenting
        oneself a costume that according to the person who wears it.
      </p>
      <router-link
        to=""
        class="btn fs-3 text-white rounded-5 border-white py-3 w-100 shopBtn"
        >Shop now</router-link
      >
    </section>
  </div>
  <main>
    <div class="container">
      <ul class="list-unstyled mb-7 mb-md-9">
        <li
          class="row row-cols-1 row-cols-md-2 align-items-center gx-0"
          :class="{ 'flex-row-reverse': !(index % 2) }"
          v-for="(item, index) in introduceList"
          :key="item.title"
        >
          <div class="col">
            <img :src="item.img" :alt="item.title" class="productImg" />
          </div>
          <div class="col mb-6 mb-md-0">
            <article class="productText mx-auto">
              <h2 class="h2 fw-bold mb-0">{{ item.title }}</h2>
              <p class="fs-5">{{ item.text }}</p>
              <router-link
                to="/product?page=1&category=all"
                class="text-decoration-none"
                >查看更多</router-link
              >
            </article>
          </div>
        </li>
        <li class="row row-cols-1 row-cols-md-2 align-items-center gx-0">
          <div class="col">
            <img
              src="https://images.unsplash.com/photo-1542038382126-77ae2819338d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjR8MTE1ODAyMTR8fGVufDB8fHx8fA%3D%3D"
              alt="introduce"
              class="introduceImg"
            />
          </div>
          <div class="col">
            <article class="productText mx-auto">
              <ol class="list-unstyled">
                <li
                  v-for="(item, index) in introduceText"
                  :key="item.title"
                  class="mb-4 mb-md-8"
                >
                  <h2 class="h4 fw-bold mb-0">
                    {{ index + 1 }}.<br />{{ item.title }}
                  </h2>
                  <p class="mb-0">{{ item.content }}</p>
                </li>
              </ol>
              <button
                type="button"
                class="mt-md-2 btn w-100 border-2 border-black rounded-5 py-2 h5 fw-medium"
              >
                Plan a free online training
              </button>
            </article>
          </div>
        </li>
      </ul>
    </div>

    <div class="products bg-gray py-7">
      <div class="container">
        <ul class="list-unstyled row flex-column flex-md-row m-0">
          <li
            class="col mb-md-0"
            v-for="(item, index) in products"
            :class="{ 'mb-6': index !== products.length - 1 }"
            :key="item.id"
          >
            <div class="productItem overflow-hidden position-relative">
              <img
                :src="item.image"
                :alt="item.title"
                class="img-fluid mb-2 pointer"
              />
              <div v-if="!item.is_enabled" class="soldOut position-absolute bg-secondary bg-opacity-75 text-white text-center top-0 start-0 end-0 bottom-0 fs-4 fw-semibold">Sold out</div>
            </div>
            <h3 class="h4 fw-semibold mb-0">{{ item.title }}</h3>
            <p class="fw-light">{{ item.category }}</p>
            <p class="fw-light mb-0">
              NT${{ item.price }}
              <del
                class="text-secondary ms-2"
                v-if="item.price !== item.origin_price"
                >NT${{ item.origin_price }}</del
              >
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="blog container py-7 py-md-9">
      <article class="row align-items-center">
        <img src="https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMTU4MDIxNHx8ZW58MHx8fHx8" alt="Bottle-Recycling" class="col-12 col-md-8 blogImg object-fit-cover" height="520">
        <section class="col">
          <h4 class="mb-0 h2 fw-bold">Bottle-Recycling</h4>
          <h5 class="fw-light fs-5 mb-2 mb-md-3">Recycle your used empty bottles and be rewarded!</h5>
          <p class="fw-light fs-5 mb-2 mb-md-3">For the past 10 years, we have collected over 800,000 bottles through Empty Bottle Recycling Campaign and planted more than 860 pine trees for a better environment.For the past 10 years, we have collected over 800,000 bottles through Empty Bottle Recycling Campaign and planted more than 860 pine trees for a better environment.</p>
          <router-link to="" class="fw-semibold text-decoration-none">查看更多</router-link>
        </section>
      </article>
    </div>
  </main>
  <OrderInfo />
  <Footer />
</template>
<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import OrderInfo from '@/components/OrderInfo.vue';
import { ref, onMounted } from 'vue';
import productsApi from '../mixin/api/products';

const introduceList = ref([
  {
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8MTE1ODAyMTR8fGVufDB8fHx8fA%3D%3D',
    title: 'Gabrielle CHANEL',
    text: '全新嗅覺體驗，花香四溢、明亮馥郁。結合茉莉、依蘭依蘭、橙花和最迷人的格拉斯晚香玉之花香，呈現出夢幻花香氣息。 極具女性特質的香奈兒嘉柏麗香水，專為光芒四射的她而生。',
  },
  {
    img: 'https://images.unsplash.com/photo-1592247691114-69a06342531a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXwxMTU4MDIxNHx8ZW58MHx8fHx8',
    title: 'Five O’clock Au Gingembre',
    text: '生薑與溫醇的肉桂香、紅糖的香甜摻和成一氣，溫暖微辛的氣息反倒形成一股輕煙氤氳開來，還帶點微微煙醺感漫溢在整個鼻息之間，細聞之下,又還有溫溫淡淡的木香，溫和而暖心。',
  },
  {
    img: 'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8MTE1ODAyMTR8fGVufDB8fHx8fA%3D%3D',
    title: 'CHANEL N°5',
    text: 'N°5，女性魅力的極致精髓。散發柔美澄透的乙醛花束香氣。經典傳奇香氛，蘊藏於極簡設計的獨特瓶身。',
  },
]);
const introduceText = ref([
  {
    title: 'Levels of Preventive Maintenance Compliance',
    content:
      'The core idea of preventative maintenance is the performance of proactive actions against unscheduled downtime in order to identify potential defects before they evolve into something more severe.',
  },
  {
    title: 'Percentage of Planned Maintenance',
    content:
      'The planned maintenance percentage is the total planned maintenance time in your CMMS software over a date range over the total number of hours of a service performed by the technicians.',
  },
  {
    title: 'Critical percentage of planned maintenance',
    content:
      'Calculating the critical percentage of planned maintenance will help you prioritize the most important operations that should be performed immediately.',
  },
]);

const products = ref([]);
onMounted(async () => {
  const res = await productsApi();
  products.value = res.products.slice(0, 3);
});
</script>
<style lang="scss" scoped>
.banner {
  height: 480px;
  background: url('https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTU4MDIxNHx8ZW58MHx8fHx8')
    no-repeat 10% / cover;
  @media (min-width: 768px) {
    height: 870px;
  }
}
.bannerText {
  width: 100%;
  @media (min-width: 768px) {
    width: 445px;
    left: 50%;
  }
}
.shopBtn {
  transition: all 0.3s;
  left: 0;
  &:hover {
    border-color: $primary !important;
    background: $primary;
  }
  @media (min-width: 768px) {
    max-width: 350px;
  }
}

.productImg {
  width: 100%;
  height: 350px;
  object-fit: cover;
  @media (min-width: 768px) {
    height: 555px;
  }
}
.introduceImg {
  width: 100%;
  height: 680px;
  @media (min-width: 768px) {
    height: 1080px;
  }
}
.productText {
  @media (min-width: 768px) {
    width: 350px;
  }
}
.productItem {
  height: 350px;
  @media (min-width: 768px) {
    height: 540px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
.soldOut{
  cursor: default;
  line-height: 350px;
  @media (min-width: 768px) {
    line-height: 540px;
  }
}
</style>
