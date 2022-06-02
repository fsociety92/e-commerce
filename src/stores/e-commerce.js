// import { defineStore } from 'pinia'

// // const axios = Axios.create({
// //   baseURL: 'http://38.242.229.113:8055/',
// // })


// export const useECommerceStore = defineStore({
//   id: 'e-commerce',
//   state: () => ({
//     products: useLocalStorage('products'),
//     product: useLocalStorage('product'),
//     categories: useLocalStorage('categories'),
//     category: useLocalStorage('category')
//   }),
//   getters: {},
//   actions: {
//     async fetchProducts(query) {
//       const url = query ? '/api/products?' + qs.stringify(query,{ encodeValuesOnly: true }) : '/api/products?pagination[page]=1&pagination[pageSize]=10';
//       const { data } = await axios.get(url)
//       this.products = data
//     },
//     async fetchProduct(id) {
//       const { data } = await axios.get(`/api/products/${id}?populate=images`)
//       this.product = data
//     },
//     async fetchCategories() {
//       const { data } = await axios.get('/api/categories')
//       this.categories = data
//     },
//   }
// })

// qs.stringify(query,{ encodeValuesOnly: true })