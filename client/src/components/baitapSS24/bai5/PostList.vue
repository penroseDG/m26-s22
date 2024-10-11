<template>
    <div>
      <h1>Danh sách bài viết</h1>
      
      <!-- Hiệu ứng loading -->
      <div v-if="isLoading" class="loading-spinner">
        <img src="loading-spinner.gif" alt="Loading..." />
      </div>
      
      <!-- Nội dung bài viết -->
      <div v-if="!isLoading && posts.length === 0">Không có bài viết nào.</div>
      <ul v-else-if="!isLoading">
        <li v-for="post in paginatedPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <img :src="post.image" alt="Hình ảnh bài viết" />
          <p>{{ post.content }}</p>
          <p>Ngày viết: {{ post.date }}</p>
          <p>Trạng thái: {{ post.status }}</p>
        </li>
      </ul>
  
      <!-- Nút phân trang -->
      <button @click="prevPage" :disabled="currentPage === 1">Trang trước</button>
      <button @click="nextPage" :disabled="currentPage >= maxPage">Trang sau</button>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [],
        currentPage: 1,
        postsPerPage: 5,
        isLoading: false,  // Trạng thái loading
      };
    },
    computed: {
      paginatedPosts() {
        const start = (this.currentPage - 1) * this.postsPerPage;
        return this.posts.slice(start, start + this.postsPerPage);
      },
      maxPage() {
        return Math.ceil(this.posts.length / this.postsPerPage);
      },
    },
    methods: {
      async fetchPosts() {
        this.isLoading = true;  // Bắt đầu loading
        try {
          const response = await axios.get('http://localhost:3000/posts'); // Thay đổi đường dẫn API nếu cần
          this.posts = response.data;
        } catch (error) {
          console.error("Có lỗi xảy ra khi gọi API:", error);
        } finally {
          this.isLoading = false;  // Kết thúc loading
        }
      },
      nextPage() {
        if (this.currentPage < this.maxPage) {
          this.currentPage += 1;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
        }
      },
    },
    mounted() {
      this.fetchPosts();
    },
  };
</script>
  
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 20px 0;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  button {
    margin: 5px;
  }
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px; /* Điều chỉnh chiều cao theo giao diện của bạn */
  }
</style>
  