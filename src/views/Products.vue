<template>
  <!-- <div class="body">
    <div class="header0">
    <div class="header">
    <h1 class="h1h">Shop-OP</h1>
    <div class="butspace">
    <input type="text" v-model="search" placeholder="search"/>
    <button @click="searchProducts">search</button>
    </div>
    </div></div>
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Oh no... {{ error }}</div>
    <div class="banner">
        
    </div>
    <div class="producty">
      <div v-if="data" class="producti">
        <div v-for="p in data.products" :key="p.id" @click="move(p.id)" class="product_card">
          <p class="title">{{ p.title }}</p>
          <p class="price">{{ p.price + "$" }}</p>
          <img class="imagy" :src="'http://38.242.229.113:8055/assets/' + p.image.id + '?width=190&height=200'" alt="">
        </div>
      </div>
    </div>
  </div> -->



  <div class="bg-white">
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Oh no... {{ error }}</div>
    <!-- <button @click="searchProducts">search</button> -->
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
       <div v-if="data">
      <div v-for="p in data.products" :key="p.id" @click="move(p.id)"  class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <!-- <a v-for="product in products" :key="product.id" :href="product.href" class="group"> -->
          <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img class="w-full h-full object-center object-cover group-hover:opacity-75" :src="'http://38.242.229.113:8055/assets/' + p.image.id + '?width=190&height=200'" alt="" />
          </div>
        <p class="mt-4 text-sm text-gray-700">
          {{ p.title }}
        </p>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ p.price + "$" }}
        </p>
        <!-- </a> -->
      </div>
      </div>
  </div>
</div>


</template>

<script>
import { useQuery } from "@urql/vue";
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from 'vue-router'
import tailwindConfig from "../../tailwind.config";

export default {
  setup() {
    const search = ref(null);
    const router = useRouter()
    const route = useRoute()
    const result = useQuery(
      {
        query: `
        query($search: String) {
          products(search: $search) {
            id
            title
            price
            spec
            image {
              id
            }
          }
        }
      `, variables: { search }
      },
    );
    function searchProducts() {
      result.executeQuery()
    }

    function move(id) {
      router.push("/products/" + id)
    }

    return {
      search,
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      searchProducts,
      move
    };
  },
};
</script>

<!-- <style scoped>

.product_card{
    width: 23%;
    display: flex;
    padding: 3%;
    margin: 1%;
    border: #00000059 solid 1px;
    border-radius: 5%;
    box-shadow: 0 0 10px 5px rgb(180 192 212);
    text-align: left;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    flex-wrap: nowrap;
}
.product_card:hover {
  border: #0400ff solid 1px;
  transition: 0.5s;
  cursor: pointer;
}

.body {
  margin: 0;
  padding: 0;
  margin: 0 auto;
  background-color: #fff;
  }

.header {
    display: flex;
    justify-content: space-evenly;
    margin: 0px 20px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: stretch;
    align-items: center;
}

.header0 {
  background-color: rgb(20, 19, 19);
}

.h1h {
  padding: 0px 0px 0px 0px;
  color: white;
}

.banner {
  height: 600px;
  background-image: url("https://808.media/wp-content/uploads/2022/03/lcimg-919d7e33-39ad-42ac-8c83-f936e96211d7.jpg");
  min-width: 100%;
  background-position: center;
  background-size: contain;
}
.navigation {
  display: flex;
  align-items: center;
}
.navigation li {
  list-style-type: none;
}
.navigation li:hover {
  color: #a18a68;
  text-decoration: underline;
}
.navigation input {
  margin-left: 20px;
  padding: 5px;
  border: #a18a68 solid 1px;
  border-radius: 4%;
}
.image-box {
  display: flex;
  align-items: center;
  background-image: url(http://i.yapx.ru/R7rKF.jpg);
  background-size: cover;
  width: 1100px;
  height: 500px;
  padding-left: 100px;
  border-width: 1px 0px;
  border-color: #a18a68;
  border-style: solid;
}
.image-box-text {
  width: 35%;
  font-size: 15px;
}
.image-box-button {
  padding: 10px 20px;
  border: #ffffff solid 0px;
  background-color: #eba69b;
  border-radius: 4%;
  color: #fff;
  font-weight: 700;
  margin: 20px 0px;
  opacity: 0.8;
}
.image-box-button:hover {
  opacity: 1;
}
.sort {
  text-align: right;
  margin: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.sort select {
  padding: 5px;
  border: #a18a68 solid 1px;
  border-radius: 4%;
  color: #757575;
}
.products-and-filters {
  padding: 0px 60px;
  display: flex;
  flex-wrap: wrap;
}
.filters {
  border: 1px solid #a18a68;
  width: 15%;
  padding: 30px;
}
.filters h1 {
  font-size: 24px;
}
.products {
  display: flex;
  flex-wrap: wrap;
  width: 79%;
}
.product-card {
  width: 242px;
  padding: 20px;
  border: #a18a6859 solid 1px;
}
.product-card:hover {
  border: #a18a68 solid 1px;
  transition: 0.5s;
  cursor: pointer;
}
.products img {
  width: 200px;
}
.product-img {
  display: flex;
  justify-content: center;
}
.price {
  color: #a18a68;
  font-weight: 700;
}
.pages {
  display: flex;
  margin: 20px 20px;
}
.pages button {
  background-color: transparent;
  color: #a18a68;
  font-weight: 700;
  margin-right: 10px;
  border: none;
  cursor: pointer;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #a18a6859;
}
.footer a {
  color: #a18a68;
  text-decoration: none;
}
.footer a:hover {
  text-decoration: underline;
}

/* .producty {
    width: 1600px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: stretch;
    justify-content: space-between;
    align-items: center;
} */

.producti {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: stretch;
    justify-content: space-between;
    align-items: center;
}

.imagy {
  margin: 7%;
  padding: 5%;
  /* height: 200px;
  width: 250px; */
}

</style> -->