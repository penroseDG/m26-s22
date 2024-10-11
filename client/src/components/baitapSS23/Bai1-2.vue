<template>
    <div>
      <h2>Danh sách sinh viên</h2>
      <ul>
        <li v-for="student in students" :key="student.id">{{ student.student_name }}</li>
      </ul>
    </div>
</template>
  
<script>  
  export default {
    data() {
      return {
        students: []
      };
    },
    async created() {
      this.students = await getAllStudent();
      console.log(this.students); // Hiển thị danh sách sinh viên ra console
    }
  };
</script>
  