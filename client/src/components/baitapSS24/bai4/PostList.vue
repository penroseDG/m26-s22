<template>
    <div>
      <h1>Danh sách bài viết</h1>
      <div v-if="posts.length === 0">Không có bài viết nào.</div>
      <ul v-else>
        <li v-for="post in paginatedPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <img :src="post.image" alt="Hình ảnh bài viết" />
          <p>{{ post.content }}</p>
          <p>Ngày viết: {{ post.date }}</p>
          <p>Trạng thái: {{ post.status }}</p>
        </li>
      </ul>
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
        try {
          const response = await axios.get('http://localhost:3000/posts'); // Thay đổi đường dẫn API nếu cần
          this.posts = response.data;
        } catch (error) {
          console.error("Có lỗi xảy ra khi gọi API:", error);
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
</style>
  