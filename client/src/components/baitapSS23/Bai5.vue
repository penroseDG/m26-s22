<template>
    <div>
      <h2>Danh sách sinh viên</h2>
      <ul>
        <li v-for="student in students" :key="student.id">
          {{ student.student_name }}
        </li>
      </ul>
  
      <h3>Thêm sinh viên mới</h3>
      <form @submit.prevent="createStudent">
        <label for="student_name">Tên sinh viên:</label>
        <input v-model="newStudent.student_name" type="text" id="student_name" required>
  
        <label for="email">Email:</label>
        <input v-model="newStudent.email" type="email" id="email" required>
  
        <label for="address">Địa chỉ:</label>
        <input v-model="newStudent.address" type="text" id="address" required>
  
        <label for="phone">Số điện thoại:</label>
        <input v-model="newStudent.phone" type="text" id="phone" required>
  
        <label for="status">Trạng thái:</label>
        <select v-model="newStudent.status" id="status">
          <option :value="true">Hoạt động</option>
          <option :value="false">Không hoạt động</option>
        </select>
  
        <button type="submit">Thêm sinh viên</button>
      </form>
    </div>
</template>
  
<script>
  import { createStudent } from '../services/StudentService';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        students: [], // Lưu trữ danh sách sinh viên
        newStudent: {  // Đối tượng sinh viên mới
          student_name: '',
          email: '',
          address: '',
          phone: '',
          status: true,
          created_at: new Date(), // Thời gian thêm sinh viên
        },
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
  
      // Hàm để thêm sinh viên mới
      async createStudent() {
        try {
          // Gọi API để tạo sinh viên mới
          const result = await createStudent(this.newStudent);
          console.log('Sinh viên mới tạo:', result);
          
          // Thêm sinh viên mới vào danh sách sinh viên hiện tại
          this.students.push(result);
  
          // Reset form sau khi thêm
          this.newStudent = {
            student_name: '',
            email: '',
            address: '',
            phone: '',
            status: true,
            created_at: new Date(),
          };
        } catch (error) {
          console.error('Lỗi khi thêm sinh viên mới:', error);
        }
      },
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
  form {
    margin-top: 20px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input, select {
    display: block;
    margin-bottom: 10px;
  }
  button {
    margin-top: 10px;
  }
</style>
  