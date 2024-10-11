<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Xác nhận</h4>
          <button class="close" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button @click="cancelAction" class="btn btn-secondary">Hủy</button>
          <button @click="confirmAction" class="btn btn-primary">Xác nhận</button>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        default: "Bạn có chắc chắn muốn ngừng xuất bản bài viết?",
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmAction() {
        this.$emit('confirm');
      },
      cancelAction() {
        this.$emit('cancel');
      },
    },
  };
</script>
  
<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 100%;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
  