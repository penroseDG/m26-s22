<template>
    <div>
      <h1>Product List</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }} - Quantity: {{ product.quantity }}
          <button @click="getProductById(product.id)">Get detail</button>
          <button @click="removeProductById(product.id)">Delete</button>
          <button @click="updateProductById(product.id)">Update</button>
        </li>
      </ul>
      <button @click="createProduct">Create Product</button>
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
          const response = await fetch('http://localhost:3000/products');
          const data = await response.json();
          console.log(data);
          this.products = data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
  
      async getProductById(id) {
        try {
          const response = await fetch(`http://localhost:3000/products/${id}`);
          if (response.ok) {
            const product = await response.json();
            console.log('Product details:', product);
          } else {
            console.log('Không tìm thấy bản ghi');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      },
  
      async removeProductById(id) {
        try {
          const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            console.log(`Product with id ${id} has been deleted.`);
            this.products = this.products.filter(product => product.id !== id);
          } else {
            console.log(`Failed to delete product with id ${id}`);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      },
  
      async createProduct() {
        const product = {
          id: Math.floor(Math.random() * 1000), // Tạo id ngẫu nhiên
          name: 'New Product',
          image: 'https://via.placeholder.com/150',
          price: 100,
          quantity: 10
        };
  
        try {
          const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          });
  
          if (response.ok) {
            const createdProduct = await response.json();
            console.log('Product created:', createdProduct);
            this.products.push(createdProduct); // Thêm sản phẩm mới vào danh sách
          } else {
            console.log('Failed to create product.');
          }
        } catch (error) {
          console.error('Error creating product:', error);
        }
      },
  
      async updateProductById(id) {
        const updatedProduct = {
          name: 'Updated Product',
          image: 'https://via.placeholder.com/150',
          price: 150,
          quantity: 20
        };
  
        try {
          const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
          });
  
          if (response.ok) {
            const product = await response.json();
            console.log('Product updated:', product);
  
            // Cập nhật sản phẩm trong danh sách sản phẩm hiện tại
            const index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
              this.products[index] = product;
            }
          } else {
            console.log('Failed to update product.');
          }
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
    },
    mounted() {
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
  