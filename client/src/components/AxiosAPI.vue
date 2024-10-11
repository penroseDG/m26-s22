<template>
    <div>
        <h1>Danh sách sản phẩm</h1>
        <button @click="handleAddProduct"></button>
        <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody v-for="product in products" :key="product.id">
                <tr>
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.description }}</td>
                    <td>
                        <button @click="getProductById(product.id)">Info</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref([]);

const fetchData = async () => {
    // axios
    //  .get("http://localhost:8080/products")
    //  .then((response) => {
    //     products.value = response.data;
    //  })
    //  .catch((error) => console.log(error));

    try {
        const response = await axios.get("http://localhost:8080/products");
        
        products.value = response.data;
    } catch (error) {
        // Xử lí các lỗi
    }
};

onMounted(() => {
    fetchData();
});

// Hàm lấy thông tin chi tiết một sản phẩm theo id
const getProductById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        console.log("Data: ", response.data);
    } catch (error) {
        // Xử lí lỗi
    } 
};

// Ham them moi san pham
const handleAddProduct = () => {
    try {
        const response = axios.post("http://localhost:8080/products", {
           name: "Men men",
           price: 20000,
           quantity: 10,
           description: "Hoi kho",
        });

        console.log("Response: ", response); 

        fetchData();
    } catch (error) {}
}
</script>

<style></style>