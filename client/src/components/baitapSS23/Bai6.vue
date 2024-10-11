<template>
    <div>
      <h2>Danh sách sinh viên</h2>
      <ul>
        <li v-for="student in students" :key="student.id">
          {{ student.student_name }}
          <button @click="editStudent(student)">Chỉnh sửa</button>
        </li>
      </ul>
  
      <h3 v-if="isEditing">Cập nhật thông tin sinh viên</h3>
      <h3 v-else>Thêm sinh viên mới</h3>
  
      <form @submit.prevent="isEditing ? updateStudentById() : createStudent()">
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
  
        <button type="submit">{{ isEditing ? 'Cập nhật sinh viên' : 'Thêm sinh viên' }}</button>
      </form>
    </div>
</template>
  
<script>
  import { createStudent, updateStudentById } from '../services/StudentService';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        students: [], // Lưu trữ danh sách sinh viên
        newStudent: {  // Đối tượng sinh viên mới hoặc cần chỉnh sửa
          student_name: '',
          email: '',
          address: '',
          phone: '',
          status: true,
          created_at: new Date(), // Thời gian thêm sinh viên
        },
        isEditing: false, // Để kiểm tra xem có đang chỉnh sửa sinh viên hay không
        studentIdBeingEdited: null, // Lưu id sinh viên đang được chỉnh sửa
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
          const result = await createStudent(this.newStudent);
          console.log('Sinh viên mới tạo:', result);
  
          // Thêm sinh viên mới vào danh sách sinh viên hiện tại
          this.students.push(result);
  
          // Reset form sau khi thêm
          this.resetForm();
        } catch (error) {
          console.error('Lỗi khi thêm sinh viên mới:', error);
        }
      },
  
      // Hàm để chỉnh sửa sinh viên (đưa thông tin lên form)
      editStudent(student) {
        this.newStudent = { ...student };
        this.isEditing = true;
        this.studentIdBeingEdited = student.id;
      },
  
      // Hàm để cập nhật thông tin sinh viên theo id
      async updateStudentById() {
        try {
          const result = await updateStudentById(this.studentIdBeingEdited, this.newStudent);
          console.log('Kết quả sau khi cập nhật:', result);
  
          // Cập nhật danh sách sinh viên
          const index = this.students.findIndex(student => student.id === this.studentIdBeingEdited);
          if (index !== -1) {
            this.students.splice(index, 1, result);
          }
  
          // Reset form sau khi cập nhật
          this.resetForm();
        } catch (error) {
          console.error('Lỗi khi cập nhật sinh viên:', error);
        }
      },
  
      // Hàm để reset form về trạng thái ban đầu
      resetForm() {
        this.newStudent = {
          student_name: '',
          email: '',
          address: '',
          phone: '',
          status: true,
          created_at: new Date(),
        };
        this.isEditing = false;
        this.studentIdBeingEdited = null;
      },
    },
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
</style>
  