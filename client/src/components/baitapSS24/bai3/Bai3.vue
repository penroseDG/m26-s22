<template>
    <div>
      <nav>
        <router-link to="/list-post">Danh sách bài viết</router-link>
        <router-link to="/add-post">Thêm bài viết</router-link>
      </nav>
      <router-view></router-view> <!-- Đây là nơi các component sẽ được render -->
    </div>
</template>
  