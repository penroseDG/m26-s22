<template>
    <div>
      <AddButton @addProduct="fetchProducts" />
      <table>
        <thead>
          <tr>
            <th>Thêm mới sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng (kg)</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <ProductRow v-for="product in products" :key="product.id" :product="product" @deleteProduct="fetchProducts" />
        </tbody>
      </table>
    </div>
</template>
  
<script>
  import ProductRow from './ProductRow.vue';
  import AddButton from './AddButton.vue';
  
  export default {
    components: { ProductRow, AddButton },
    data() {
      return {
        products: []
      };
    },
    methods: {
      async fetchProducts() {
        const response = await fetch('https://api.example.com/products');
        this.products = await response.json();
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
</script>
  