<template>
    <div>
      <h2>Chi tiết sinh viên</h2>
      <div v-if="student">
        <p><strong>ID:</strong> {{ student.id }}</p>
        <p><strong>Tên:</strong> {{ student.student_name }}</p>
        <p><strong>Email:</strong> {{ student.email }}</p>
        <p><strong>Địa chỉ:</strong> {{ student.address }}</p>
        <p><strong>Số điện thoại:</strong> {{ student.phone }}</p>
        <p><strong>Trạng thái:</strong> {{ student.status ? 'Hoạt động' : 'Không hoạt động' }}</p>
        <p><strong>Ngày tạo:</strong> {{ student.created_at }}</p>
      </div>
      <div v-else>
        <p>Không tìm thấy bản ghi</p>
      </div>
    </div>
</template>
  
<script>  
  export default {
    data() {
      return {
        student: null, // Lưu trữ thông tin chi tiết của sinh viên
      };
    },
    async created() {
      // Giả sử id được truyền dưới dạng prop hoặc từ route params
      const studentId = 1; // Thay thế bằng id thực tế
      const studentData = await getStudentById(studentId);
  
      if (studentData) {
        this.student = studentData;
        console.log(this.student); // Hiển thị sinh viên ra ngoài console
      } else {
        console.log("Không tìm thấy bản ghi");
      }
    },
  };
</script>
  
<style scoped>
  p {
    font-size: 16px;
    margin: 5px 0;
  }
</style>
  