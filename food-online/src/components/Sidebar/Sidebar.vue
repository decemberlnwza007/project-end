<template>
    <div class="dashboard">
    <aside class="sidebar">
        <h2>เมนู</h2>
        <ul>
            <li><a href="#overview">ภาพรวม</a></li>
            <li><a href="#users">ผู้ใช้งาน</a></li>
            <li><a href="#products">สินค้า</a></li>
            <li><a href="#orders">คำสั่งซื้อ</a></li>
            <li><a href="#settings">การตั้งค่า</a></li>
        </ul>
    </aside>

    <main class="dashboard-content">
        <header class="dashboard-header">
            <h1>Dashboard แอดมิน</h1>
        </header>

        <section id="overview" class="card">
            <h2>ภาพรวม</h2>
            <p>ข้อมูลสถิติที่สำคัญ...</p>
        </section>
        
        <section id="users" class="card">
            <h2>ผู้ใช้งาน</h2>
            <button @click="addUser">เพิ่มผู้ใช้งาน</button>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.name }} <button @click="editUser(user.id)">แก้ไข</button>
                </li>
            </ul>
        </section>

        <section id="products" class="card">
            <h2>สินค้า</h2>
            <button @click="addProduct">เพิ่มสินค้า</button>
            <ul>
                <li v-for="product in products" :key="product.id">
                    {{ product.name }} <button @click="editProduct(product.id)">แก้ไข</button>
                </li>
            </ul>
        </section>

        <section id="orders" class="card">
            <h2>คำสั่งซื้อ</h2>
            <ul>
                <li v-for="order in orders" :key="order.id">
                    คำสั่งซื้อ #{{ order.id }} - {{ order.status }}
                </li>
            </ul>
        </section>
    </main>
</div>

</template>

<script setup>

</script>

<style scoped>
    * {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Arial', sans-serif;
}

.dashboard {
    display: flex;
    height: 100vh;
    background-color: #f0f2f5;
}

.sidebar {
    width: 250px;
    background-color: #343a40;
    color: white;
    padding: 20px;
    position: relative;
    transition: width 0.3s;
}

.sidebar h2 {
    margin-top: 0;
    font-size: 24px;
    text-align: center;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    margin: 15px 0;
}

.sidebar ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    display: block;
    transition: background 0.3s, color 0.3s;
}

.sidebar ul li a:hover {
    background: #495057;
    color: #f8f9fa;
}

.sidebar ul li a.active {
    background: #007bff;
    color: #ffffff;
}

.dashboard-content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card {
    background: white;
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-top: 0;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
}

.card button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.card button:hover {
    background: #0056b3;
}

.card ul {
    list-style: none;
    padding: 0;
}

.card ul li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

</style>