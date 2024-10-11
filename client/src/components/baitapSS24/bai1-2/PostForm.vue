<template>
    <div>
      <h2>Thêm mới bài viết</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Tên bài viết:</label>
          <input type="text" v-model="post.title" required />
        </div>
        <div>
          <label for="image">Hình ảnh:</label>
          <input type="text" v-model="post.image" required />
        </div>
        <div>
          <label for="content">Nội dung (Markdown):</label>
          <textarea v-model="post.content"></textarea>
        </div>
        <markdown-it v-model="post.content"></markdown-it>
        <button type="submit">Xuất bản</button>
        <button type="button" @click="$emit('close')">Hủy</button>
      </form>
    </div>
</template>
  
<script>
  import MarkdownIt from 'vue3-markdown-it';
  
  export default {
    components: {
      'markdown-it': MarkdownIt
    },
    data() {
      return {
        post: {
          title: '',
          image: '',
          content: ''
        }
      };
    },
    methods: {
      submitForm() {
        console.log("Form submitted", this.post);
        this.$emit('close');
      }
    }
  };
</script>
  