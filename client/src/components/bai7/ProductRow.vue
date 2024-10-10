<template>
    <tr>
      <td>{{ product.name }}</td>
      <td><img :src="product.image" alt="product image" /></td>
      <td>{{ product.price }} ₫</td>
      <td>{{ product.quantity }}</td>
      <td>{{ product.dateAdded }}</td>
      <td>
        <button @click="editProduct">Sửa</button>
        <button @click="deleteProduct">Xóa</button>
      </td>
    </tr>
</template>
  
<script>
  export default {
    props: ['product'],
    methods: {
      editProduct() {
        // Logic sửa sản phẩm
      },
      async deleteProduct() {
        await fetch(`https://api.example.com/products/${this.product.id}`, { method: 'DELETE' });
        this.$emit('deleteProduct');
      }
    }
  };
</script>
  