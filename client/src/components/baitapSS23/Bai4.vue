<template>
    <div>
      <h2>Danh sách sinh viên</h2>
      <ul>
        <li v-for="student in students" :key="student.id">
          {{ student.student_name }} 
          <button @click="removeById(student.id)">Xóa</button>
        </li>
      </ul>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        students: [], // Lưu trữ danh sách sinh viên
      };
    },
    async created() {
      // Lấy danh sách sinh viên khi component được tạo
      await this.getAllStudents();
    },
    methods: {
      // Hàm để lấy danh sách sinh viên
      async getAllStudents() {
        try {
          const response = await axios.get('http://localhost:3000/students');
          this.students = response.data;
        } catch (error) {
          console.error('Lỗi khi lấy danh sách sinh viên:', error);
        }
      },
  
      // Hàm để xóa sinh viên theo ID
      async removeById(id) {
        try {
          const result = await removeById(id);
          console.log(`Xóa sinh viên với id ${id}:`, result);
          
          // Cập nhật lại danh sách sinh viên sau khi xóa
          this.students = this.students.filter(student => student.id !== id);
        } catch (error) {
          console.error('Lỗi khi xóa sinh viên:', error);
        }
      }
    }
  };
</script>
  
<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
  }
  button {
    margin-left: 10px;
    color: white;
    background-color: red;
    border: none;
    cursor: pointer;
  }
</style>
  