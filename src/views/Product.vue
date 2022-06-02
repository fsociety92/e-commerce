
<template>
  <div class="body">
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Oh no... {{ error }}</div>
    <div v-else>
      <div v-if="data">
        <div class="card-text">
          <div class="firstb">
          <div class="titleee">
          <div class="titlee">
          <h2 class="headg">{{ data.products_by_id.title }}</h2>
          </div>
          <div class="pricee">
          <p class="pprice">{{"Price "  +  data.products_by_id.price + "$" }}</p>
          </div>
          <button class="card-text-button">Добавить в корзину</button>
          <div class="description">
          <p class="ddescription">{{ data.products_by_id.description }}</p>
          </div>
          </div>
          </div>
          <div class="phoyo">
          <img :src="'http://38.242.229.113:8055/assets/' + data.products_by_id.image.id" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery } from "@urql/vue";
import { useRouter, useRoute } from 'vue-router'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { storeToRefs } from "pinia";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}



// const rootElement = document.getElementById('root')
// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <ChakraProvider theme={theme}>
//       <App />
//     </ChakraProvider>
//   </React.StrictMode>,
// )




const theme = extendTheme({ colors })
const id = +route.params.id;
    const result = useQuery({
      query: `
        query getProduct($id: ID!) {
          products_by_id(id: $id) {
            id
            title
            price
            spec
            description
            image {
              id
            }
          }
        }
      `, variables: { id }
    });
    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      route
    }
  },
};
</script>

<style scoped>
.body {
    background-color: #f6f6f6;
    width: 1400px;
    margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
}
.header a {
  font-size: 24px;
  color: #a18a68;
  text-decoration: none;
}
.header a:hover {
  color: #eba69b;
}
.product-card {
  display: flex;
  padding: 30px 50px;
}
.product-card img {
  width: 400px;
  margin-right: 50px;
}
.price-and-cart {
  display: flex;
  align-items: center;
}
.card-text-button {
    padding: 10px 20px;
    border: #ffffff solid 0px;
    background-color: #000000;
    border-radius: 4%;
    color: #fff;
    font-weight: 700;
    margin: 20px 0px;
    opacity: 0.8;
    width: 16%;
}
.card-text-button:hover {
  opacity: 1;
}
.title {
  font-size: 28px;
  font-weight: 700;
}
.price {
  font-size: 24px;
  font-weight: 700;
  color: #a18a68;
  margin-right: 15px;
}

.card-text {
  display: flex;
  width: 100%;
}

.titlee {
  display: flex;
}

.titleee{
  background-color: white;
}

.pricee {
  display: flex;
}

.specc{
  display: flex;
} 

.description {
  display: flex;
  width: 90%;
}

.pricee {
  font-size: 30px;
  width: 20%;
}

.ddescription {
  font-size: 30px;
  padding: 5px 78px 0px 0px;
}

.headg {
  font-size: 40px;
}

.firstb {
   background-color: #f6f6f6;
}


</style>