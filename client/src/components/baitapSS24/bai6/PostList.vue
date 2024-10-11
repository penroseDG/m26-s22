<template>
    <div>
      <h1>Danh sách bài viết</h1>
      
      <table>
        <tr>
          <th>STT</th>
          <th>Tiêu đề</th>
          <th>Hình ảnh</th>
          <th>Ngày viết</th>
          <th>Trạng thái</th>
          <th>Chức năng</th>
        </tr>
        <tr v-for="(post, index) in posts" :key="post.id">
          <td>{{ index + 1 }}</td>
          <td>{{ post.title }}</td>
          <td><img :src="post.image" alt="Post Image" /></td>
          <td>{{ post.date }}</td>
          <td>{{ post.status }}</td>
          <td>
            <button @click="openConfirmModal(post)">Chặn</button>
            <button @click="editPost(post)">Sửa</button>
            <button @click="deletePost(post)">Xóa</button>
          </td>
        </tr>
      </table>
  
      <!-- Modal xác nhận -->
      <ConfirmModal 
        v-if="isConfirmModalVisible" 
        :isVisible="isConfirmModalVisible"
        @confirm="blockPost"
        @cancel="closeConfirmModal"
        @close="closeConfirmModal"
      />
    </div>
</template>
  
<script>
  import axios from 'axios';
  import ConfirmModal from './components/ConfirmModal.vue';
  
  export default {
    components: {
      ConfirmModal,
    },
    data() {
      return {
        posts: [],
        selectedPost: null,
        isConfirmModalVisible: false,
      };
    },
    methods: {
      fetchPosts() {
        // Gọi API để lấy danh sách bài viết
        axios.get('http://localhost:3000/posts')
          .then(response => {
            this.posts = response.data;
          });
      },
      openConfirmModal(post) {
        this.selectedPost = post;
        this.isConfirmModalVisible = true;
      },
      closeConfirmModal() {
        this.isConfirmModalVisible = false;
        this.selectedPost = null;
      },
      blockPost() {
        // Gọi API để chặn bài viết
        axios.put(`http://localhost:3000/posts/${this.selectedPost.id}`, {
          ...this.selectedPost,
          status: 'Ngừng xuất bản',  // Hoặc 'Đã xuất bản' tùy thuộc vào trạng thái hiện tại
        }).then(() => {
          this.closeConfirmModal();
          this.fetchPosts();  // Load lại dữ liệu sau khi cập nhật
        });
      },
      editPost(post) {
        // Logic sửa bài viết
      },
      deletePost(post) {
        // Logic xóa bài viết
      },
    },
    mounted() {
      this.fetchPosts();
    },
  };
</script>
  
<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  img {
    max-width: 100px;
  }
</style>
  