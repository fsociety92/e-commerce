<template>
  <div>
    <input type="text" v-model="search" placeholder="search" />
    <button @click="searchProducts">search</button>
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Oh no... {{ error }}</div>
    <div v-else>
      <div v-if="data">
        <div
          v-for="p in data.products"
          :key="p.id"
          @click="move(p.id)"
          class="product_card"
        >
          <p>{{ p.title }}</p>
          <p>{{ p.price }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="image-box">
    <div class="image-box-text">
      <h1>
        The most obvious example of a call to action is a "Buy Now" button, or a
        "Shop Now" button on your storefront.
      </h1>
      <a href="#"><button class="image-box-button">BUY NOW</button></a>
    </div>
  </div>

  <div class="sort">
    <h1>products</h1>
    <select name="sort" v-model="sort" @change="sortProducts($event)">
      <option value="updatedAt:desc">newest</option>
      <option value="price:asc">price: ascending</option>
      <option value="price:desc">price: descending</option>
    </select>
  </div>
  <div class="products-and-filters">
    <div class="filters">
      <h1>filters</h1>
      <p>
        <input
          type="checkbox"
          value="lidar:true"
          @change="pushQueryToUrl({ spec: $event.target.value })"
        /><label>lidar</label>
      </p>
      <p>
        <input
          type="checkbox"
          value="dualsim:true"
          @change="pushQueryToUrl({ spec: $event.targproet.value })"
        /><label>dualsim</label>
      </p>
      <p>
        <input
          type="checkbox"
          value="touchbar:true"
          @change="pushQueryToUrl({ spec: $event.target.value })"
        /><label>touchbar</label>
      </p>
    </div>
    <div class="products">
      <div
        class="product-card"
        v-for="p in products.data"
        :key="p.id"
        @click="moveProduct(p.id)"
      >
        <div class="product-img">
          <div v-for="i in p.images" :key="i.id">
            <img :src="'http://localhost:1337' + i?.url" alt="" />
          </div>
        </div>
        <p>{{ p.title }}</p>
        <p class="price">{{ p.price }} USD</p>
      </div>
    </div>
  </div>
  <div class="pages">
    <div v-for="i in products?.meta?.pagination?.pageCount" :key="i">
      <button @click="pushQueryToUrl({ page: i })">{{ i }}</button>
    </div>
  </div>
  <div class="footer">
    <p>find us on <a href="#">instagram</a></p>
  </div>
</template>

<script>
import { useECommerceStore } from "@/stores/e-commerce";
import { useQuery } from "@urql/vue";
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const { products } = storeToRefs(eCommerceStore);
    const { categories } = storeToRefs(eCommerceStore);
    const eCommerceStore = useECommerceStore();
    const search = ref(null);
    const router = useRouter();
    const sort = ref(route.query.sort || "updatedAt:desc");
    const searchString = ref("");
    const spec = ref();
    let ezQuery = {};
    const route = useRoute();
    const result = useQuery({
      query: `
        query($search: String) {
          products(search: $search) {
            id
            title
            price
            spec
          }
        }
      `,
      variables: { search },
    });
    function searchProducts() {
      result.executeQuery();
    }

    function move(id) {
      router.push("/products/" + id);
    }

    function sortProducts(event) {
      pushQueryToUrl({ sort: event.target.value });
    }

    function pushQueryToUrl(queryParam) {
      Object.entries(queryParam).forEach(([key, value]) => {
        if (value) {
          if (key == "spec") {
            if (ezQuery[key] == undefined) {
              ezQuery[key] = value;
              console.log(1);
              console.log("ezQK", ezQuery[key]);
              console.log("eqq1", ezQuery);
            } else {
              ezQuery[key] = ezQuery[key].map((s) => s.join(":")) + "," + value;
            }
          } else {
            ezQuery[key] = value;
          }
        } else {
          ezQuery[key] = undefined;
        }
      });
      console.log("qparam", queryParam);

      router.push({ query: ezQuery });
    }

    async function createProductQuery() {
      ezQuery = {
        page: route.query.page,
        gte: route.query.gte,
        lte: route.query.lte,
        sort: route.query.sort,
        categoryId: route.query.categoryId,
        spec: route.query.spec
          ? route.query.spec.split(",").map((s) => s.split(":"))
          : undefined,
        search:
          route.query.search != "" || route.query.search
            ? route.query.search
            : undefined,
      };
      const pagination = { page: route.query.page || 1, pageSize: 6 };
      const populate = ["category", "images"];
      const sort = route.query.sort ? [route.query.sort] : ["updatedAt:desc"];
      const search =
        route.query.search != "" && route.query.search
          ? route.query.search
          : undefined;

  const filters = {
        $and: [
          {
            price: {
              $gte: route.query.price_gte,
            },
          },
          {
            price: {
              $lte: route.query.price_lte,
            },
          },
          {
            category: {
              id: {
                $eq: route.query.categoryId || categories[0]?.id,
              },
            },
          },
          {
            title: {
              $containsi: search,
            },
          },
        ],
      };
      if (ezQuery.spec) {
        ezQuery.spec.map((s) => {
          filters.$and.push({
            spec: {
              $containsi: `"${s[0]}":${s[1]}`,
            },
          });
        });
      }
      const query = {
        populate,
        pagination,
        sort,
        filters,
      };
      await eCommerceStore.fetchCategories();
      await eCommerceStore.fetchProducts(query);
      console.log(filters);
    }
    watchEffect(() => {
      createProductQuery();
    });
    onMounted(() => {});

      return {
        search,
        fetching: result.fetching,
        data: result.data,
        products,
        eCommerceStore,
        pushQueryToUrl,
        categories,
        sort,
        sortProducts,
        searchString,
        moveProduct,
        error: result.error,
        searchProducts,
        move,
      };
    }
  };
</script>

<style scoped>
.product_card {
  border: 3px black solid;
  margin: 1rem;
}
</style>