<template>
    <div>
      <h1>Danh sách sản phẩm</h1>
      <button @click="showCreateForm = true">Thêm mới sản phẩm</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng (kg)</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td>{{ product.name }}</td>
            <td><img :src="product.image" alt="Hình ảnh" width="50" /></td>
            <td>{{ product.price }} đ</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.dateAdded }}</td>
            <td>
              <button @click="editProduct(product)">Sửa</button>
              <button @click="removeProductById(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Form cập nhật sản phẩm -->
      <div v-if="isEditFormVisible" class="edit-form">
        <h2>Cập nhật sản phẩm</h2>
        <div>
          <label>Tên sản phẩm</label>
          <input v-model="productForm.name" type="text" />
        </div>
        <div>
          <label>Hình ảnh (url)</label>
          <input v-model="productForm.image" type="text" />
        </div>
        <div>
          <label>Giá</label>
          <input v-model="productForm.price" type="number" />
        </div>
        <div>
          <label>Số lượng</label>
          <input v-model="productForm.quantity" type="number" />
        </div>
        <div>
          <button @click="cancelEdit">Đóng</button>
          <button @click="saveProduct">Lưu</button>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        products: [], // Danh sách sản phẩm
        productForm: {
          id: null,
          name: '',
          image: '',
          price: '',
          quantity: '',
        },
        isEditFormVisible: false,
      };
    },
    methods: {
      // Lấy danh sách sản phẩm từ API
      async getAllProduct() {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        this.products = data;
      },
  
      // Hiển thị form chỉnh sửa với dữ liệu của sản phẩm
      editProduct(product) {
        this.productForm = { ...product }; // Sao chép dữ liệu sản phẩm vào form
        this.isEditFormVisible = true;
      },
  
      // Hủy bỏ chỉnh sửa và đóng form
      cancelEdit() {
        this.isEditFormVisible = false;
        this.productForm = {
          id: null,
          name: '',
          image: '',
          price: '',
          quantity: '',
        };
      },
  
      // Kiểm tra tên sản phẩm có trùng lặp không
      isProductNameDuplicate(name) {
        return this.products.some(
          (product) => product.name === name && product.id !== this.productForm.id
        );
      },
  
      // Cập nhật sản phẩm
      async saveProduct() {
        // Kiểm tra dữ liệu
        if (
          !this.productForm.name ||
          !this.productForm.image ||
          !this.productForm.price ||
          !this.productForm.quantity
        ) {
          alert('Vui lòng điền đầy đủ thông tin.');
          return;
        }
  
        if (this.isProductNameDuplicate(this.productForm.name)) {
          alert('Tên sản phẩm đã tồn tại.');
          return;
        }
  
        // Gọi API để cập nhật sản phẩm
        const response = await fetch(
          `http://localhost:3000/products/${this.productForm.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.productForm),
          }
        );
  
        const updatedProduct = await response.json();
  
        // Cập nhật danh sách sản phẩm với dữ liệu mới
        const index = this.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          this.products.splice(index, 1, updatedProduct);
        }
  
        // Đóng form và reset
        this.isEditFormVisible = false;
        this.productForm = {
          id: null,
          name: '',
          image: '',
          price: '',
          quantity: '',
        };
      },
  
      // Xóa sản phẩm
      async removeProductById(id) {
        await fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
        });
        this.products = this.products.filter((product) => product.id !== id);
      },
    },
    mounted() {
      this.getAllProduct();
    },
  };
</script>
  
<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  button {
    margin-right: 10px;
  }
  
  .edit-form {
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 20px;
  }
</style>
  