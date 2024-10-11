import { createRouter, createWebHistory } from 'vue-router';
import PostList from '@/components/baitapSS24/bai1-2/PostList.vue';
import PostForm from '@/components/baitapSS24/bai1-2/PostForm.vue';

const routes = [
  {
    path: '/list-post',
    name: 'PostList',
    component: PostList,
  },
  {
    path: '/add-post',
    name: 'PostForm',
    component: PostForm,
  },
  // Bạn có thể thêm các route khác nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
