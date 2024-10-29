<template>
    <div class="input-container">
        <input type="text" class="styled-input" placeholder="ค้นหาอาหาร...">
    </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

*{
    font-family: "Kanit";
}

.input-container {
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 15vh; 
}

.styled-input {
    width: 60%;
    padding: 0.75rem 1rem; 
    border: 2px solid #f97316; 
    border-radius: 15px; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 1rem; 
    transition: border-color 0.3s;
}

.styled-input:focus {
    outline: none; 
    border-color: #f97316; 
    box-shadow: 0 0 0 2px rgba(247, 115, 22, 0.5); 
}
</style>
