<template>
    <div>
      <h2>Giao diện quản lý bài viết</h2>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Ngày viết</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <td>{{ index + 1 }}</td>
            <td>{{ post.title }}</td>
            <td><img :src="post.image" alt="post.title" width="50"></td>
            <td>{{ post.created_at }}</td>
            <td>{{ post.status }}</td>
            <td>
              <button @click="blockPost(post.id)">Chặn</button>
              <button @click="editPost(post.id)">Sửa</button>
              <button @click="deletePost(post.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showPostForm = true">Thêm mới bài viết</button>
      <PostForm v-if="showPostForm" @close="showPostForm = false" />
    </div>
</template>
  
<script>
  import PostForm from './PostForm.vue';
  
  export default {
    components: {
      PostForm
    },
    data() {
      return {
        posts: [
          { 
            id: 1, 
            title: "State trong ReactJS", 
            image: "https://example.com/image1.jpg", 
            created_at: "04/03/2024", 
            status: "Đã xuất bản" 
          },
          { 
            id: 2, 
            title: "Tổng quan về ReactJS", 
            image: "https://example.com/image2.jpg", 
            created_at: "03/03/2024", 
            status: "Đã xuất bản" 
          }
        ],
        showPostForm: false
      };
    },
    methods: {
      blockPost(id) {
        console.log(`Chặn bài viết với id: ${id}`);
      },
      editPost(id) {
        console.log(`Sửa bài viết với id: ${id}`);
      },
      deletePost(id) {
        console.log(`Xóa bài viết với id: ${id}`);
      }
    }
  };
</script>
  