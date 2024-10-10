<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" :id="'product-' + product.id">
            <td>{{ product.name }}</td>
            <td><img :src="product.image" alt="product.name" /></td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.dateAdded }}</td>
            <td>
              <button @click="editProduct(product.id)">Sửa</button>
              <button @click="confirmDelete(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        products: [
          // Dữ liệu sản phẩm mẫu
          { id: 1, name: 'Sản phẩm 1', image: 'image1.jpg', price: 100, quantity: 10, dateAdded: '2024-10-01' },
          { id: 2, name: 'Sản phẩm 2', image: 'image2.jpg', price: 200, quantity: 20, dateAdded: '2024-10-02' },
          { id: 3, name: 'Sản phẩm 3', image: 'image3.jpg', price: 300, quantity: 30, dateAdded: '2024-10-03' }
        ]
      };
    },
    methods: {
      editProduct(id) {
        // Hàm chỉnh sửa sản phẩm
        console.log(`Chỉnh sửa sản phẩm với id: ${id}`);
      },
      confirmDelete(id) {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
          this.deleteProduct(id);
        }
      },
      deleteProduct(id) {
        // Gửi yêu cầu xóa sản phẩm đến server
        fetch(`/api/products/${id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Xóa sản phẩm khỏi danh sách
            this.products = this.products.filter(product => product.id !== id);
          } else {
            alert('Xóa sản phẩm thất bại!');
          }
        })
        .catch(error => console.error('Error:', error));
      }
    }
  };
</script>
  
<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
</style>
  