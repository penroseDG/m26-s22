<template>
    <div>
      <h1>Product List</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }} - Quantity: {{ product.quantity }}
        </li>
      </ul>
    </div>
</template>
  
<script>
  export default {
    name: 'ListProduct',
    data() {
      return {
        products: [] // Khởi tạo mảng sản phẩm rỗng
      };
    },
    methods: {
      async getAllProduct() {
        try {
          // Sử dụng fetch để gọi API lấy danh sách sản phẩm
          const response = await fetch('http://localhost:3000/products');
          const data = await response.json();
          console.log(data); // Hiển thị danh sách sản phẩm ra màn hình console
          this.products = data; // Lưu dữ liệu vào biến products
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    },
    mounted() {
      // Sử dụng lifecycle hook mounted để gọi hàm getAllProduct khi component đã được render
      this.getAllProduct();
    }
  };
</script>
  
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f4f4f4;
    margin: 5px 0;
    padding: 10px;
    border-radius: 4px;
  }
</style>
  