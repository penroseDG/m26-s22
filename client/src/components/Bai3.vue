<template>
    <div>
      <h1>Product List</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }} - Quantity: {{ product.quantity }}
          <button @click="getProductById(product.id)">Get detail</button>
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
      },
      
      async getProductById(id) {
        try {
          // Sử dụng fetch để gọi API lấy thông tin sản phẩm dựa trên id
          const response = await fetch(`http://localhost:3000/products/${id}`);
          if (response.ok) {
            const product = await response.json();
            console.log('Product details:', product); // Hiển thị chi tiết sản phẩm ra console
          } else {
            console.log('Không tìm thấy bản ghi'); // Thông báo khi không tìm thấy sản phẩm
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
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
  
  button {
    margin-left: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
</style>
  