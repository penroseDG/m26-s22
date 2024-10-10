<template>
    <button @click="addProduct">Thêm mới sản phẩm</button>
</template>
  
<script>
  export default {
    methods: {
      async addProduct() {
        // Logic thêm sản phẩm mới
        this.$emit('addProduct');
      }
    }
  };
</script>
  