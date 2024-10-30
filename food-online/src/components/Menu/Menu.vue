<template>
    <div class="container">
        <div class="header-section">
            <h1 class="page-title">หิวใช่หรือไม่?</h1>
            <button @click="toggleCart" class="view-cart-btn" id="sticky" :class="{ 'cart-anmation': isAnimating }">
                <OhVueIcon name="bi-cart-fill" style="width: 24px; height: 24px" />
                <p>{{ cart.length }}</p>
            </button>
        </div>

        <nav class="categories-nav">
            <div v-for="(category, index) in categories" :key="index" class="category-pill"
                :class="{ active: category.active }">
                <button class=" custom-button">{{ category.title }}</button>
            </div>
        </nav>

        <h2 class="section-title">เมนูแนะนำ</h2>
        <div class="featured-recipe">

        <div v-for="(recipe, index) in recipes" :key="index">
            <img src="https://s359.kapook.com/r/600/auto/pagebuilder/827b5b4c-e396-49bc-a9ba-282ba7e20f83.jpg"
                :alt="recipe.title" class="featured-image">
            <div class="featured-content">
                <h2 class="featured-title" style="color: white;"> {{ spaghetti.title }}</h2>
                <!-- <p>79 ฿</p> -->
                <button class="view-recipe-btn" @click="addToCart('ไก่ทอด KFC')">สั่งเลย</button>
            </div>
        </div>
    </div>
        <Search />
        <!-- Recipe Grid -->
        <div class="recipes-section">
            <div class="section-header">
                <h2 class="section-title">เมนูยอดนิยม</h2>
                <button class="view-all-btn">ดูทั้งหมด</button>
            </div>

            <div class="recipes-grid">
                <div v-for="(recipe, index) in recipes" :key="index" class="recipe-card">
                    <div class="recipe-image-wrapper">
                        <img :src="recipe.imageUrl" :alt="recipe.title" class="recipe-image">
                    </div>
                    <div class="recipe-info">
                        <div class="recipe-meta">
                            <span class="text-md">{{ recipe.category }}</span>
                            <div class="recipe-rating">
                                <span class="rating-number">{{ recipe.rating }}</span>
                                <span class="star filled">★</span>
                            </div>
                        </div>
                        <h3 class="recipe-title">{{ recipe.title }}</h3>
                        <div class="recipe-chef-price">
                            <p class="text-sm">โดย {{ recipe.chef }}</p>
                            <span class="flex justify-end">{{ recipe.price }}</span>
                        </div>
                        <br>
                        <button class="button-view-menu w-full" @click="addToCart(recipe)">หยิบใส่ตะกร้า</button>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="showCart" class="cart-modal">
            <div class="cart-list">
                <h2>รายการในตะกร้า</h2>
                <ul>
                    <li v-for="(item, index) in cart" :key="index" class="cart-item">
                        {{ item.title }} - {{ item.price }} <button @click="removeFromCart(index)" class="remove-btn">ลบ</button>
                    </li>
                </ul>
                <hr>
                <br>
                <p class="flex justify-end">รวม: {{ totalPrice  }} ฿</p>
                <div class="cart-footer">
                    <button @click="toggleCart" class="close-btn ">ปิด</button>
                    <button @click="confirmOrder" class="confirm-order-btn">ยืนยันการสั่งซื้อ</button>
                </div>
            </div>
        </div>

        <div v-if="showConfirmation" class="confirmation-modal">
            <h2>ยืนยันการสั่งซื้อ</h2>
            <p>คุณต้องการสั่งอาหารต่อไปนี้:</p>
            <br>
            <hr>
            <br>
            <ul>
                <li v-for="(item, index) in cart" :key="index">
                    <li>{{ item.title }}</li>
                    <li class="flex justify-end">{{ item.price }}</li>
                </li>
                <li>ราคารวม: {{ totalPrice }} ฿ </li>
            </ul>
            <button @click="placeOrder" class="confirm-order-btn w-9/12">ยืนยัน</button>
            &nbsp;
            <button @click="cancelOrder" class="remove-btn w-2/12">ยกเลิก</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Search from '../Search/Search.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiRefreshLine } from 'oh-vue-icons/icons';
import { BiCartFill } from 'oh-vue-icons/icons';


const icons = {
    RiRefreshLine,
    BiCartFill
}

addIcons(RiRefreshLine);
addIcons(BiCartFill);

const categories = ref([
    { title: 'ทั้งหมด', active: true },
    { title: 'อาหารไทย', active: false },
    { title: 'อาหารอีสาน', active: false },
    { title: 'อาหารฟิวชั่น', active: false },
    { title: 'ของหวาน', active: false },
    { title: 'เครื่องดื่ม', active: false }
]);

const recipes = ref([
    {
        title: 'สลัดไก่ทอดสมุนไพร',
        category: 'อาหารฟิวชั่น',
        rating: 4.9,
        chef: 'เชฟมิ้นท์',
        imageUrl: 'https://img.wongnai.com/p/1920x0/2022/09/21/ffe2ec4187a24c69ae86ce20641bdd86.jpg',
        price: '129 ฿'
    },
    {
        title: 'ข้าวผัดกุ้งกระเทียม',
        category: 'อาหารไทย',
        rating: 4.8,
        chef: 'เชฟปิง',
        imageUrl: 'https://www.pholfoodmafia.com/wp-content/uploads/2018/07/1000x6503GarlicPrawnFriedRice.jpg',
        price: '79 ฿'
    },
    {
        title: 'ส้มตำไทย',
        category: 'อาหารอีสาน',
        rating: 4.9,
        chef: 'เชฟแหม่ม',
        imageUrl: 'https://www.unileverfoodsolutions.co.th/th/chef-inspiration/simple-tips-for-great-flavour/somtum-green-papaya-salad-recipes/jcr:content/parsys/content-aside-footer/tipsandadvice/image.img.jpg/1695118621402.jpg',
        price: '69 ฿'
    },
    {
        title: 'สปาเกตตี้คาโบนารา',
        category: 'อาหารต่างประเทศ',
        rating: 4.8,
        chef: 'Go Don',
        imageUrl: 'https://s359.kapook.com/r/600/auto/pagebuilder/827b5b4c-e396-49bc-a9ba-282ba7e20f83.jpg',
        price: '79 ฿'
    }
]);

const spaghetti = recipes.value.find(recipe => recipe.title === 'สปาเกตตี้คาโบนารา');

const isAnimating = ref(false);

const cart = ref([]);
const showCart = ref(false);
const showConfirmation = ref(false);

const addToCart = (recipe) => {
    cart.value.push({ title: recipe.title, price: recipe.price });
};

const removeFromCart = (index) => {
    cart.value.splice(index, 1);
};


const toggleCart = () => {
    showCart.value = !showCart.value;
    isAnimating.value = true;

    setTimeout(() => {
        isAnimating.value = false;
    }, 300)
};

const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(0);
})

console.log(totalPrice)



const confirmOrder = () => {
    if (cart.value.length > 0) {
        showConfirmation.value = true;
        showCart.value = false;
    }
};

const placeOrder = () => {
    alert('สั่งซื้อเรียบร้อยแล้ว: ' + cart.value.join(', '));
    cart.value = [];
    showConfirmation.value = false;
};

const cancelOrder = () => {
    showConfirmation.value = false;
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500&display=swap');


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Kanit', sans-serif;
}

.cart {
    font-size: 5rem;
}

:root {
    --primary-color: #2D3436;
    --accent-color: #00B894;
    --background-color: #FFFFFF;
    --surface-color: #F8FAFC;
    --text-primary: #2D3436;
    --text-secondary: #636E72;
    --border-color: #DFE6E9;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.04);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
}

.swal2-popup {
    font-family: "Kanit";
}


.custom-button {
    padding: 12px 24px;
    background-color: #f97316;
    border: none;
    border-radius: 12px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-button:hover {
    background-color: #fb923c; 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.custom-button:active{
    background-color: #f97316; 
    transform: scale(0.95); 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.cart-animation {
    animation: bounce 0.3s;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}


.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px;
}

/* #sticky{
    position: sticky;
    top: 0;
} */

.cart-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
    transition: transform 0.3s ease;
    transform: scale(1);
}

/* .cart-modal {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.9);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
} */

.cart-modal.active {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
}


.cart-list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;
    padding: 20px;
    list-style: none;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.cart-item:last-child {
    border-bottom: none;
}

.remove-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
}

.cart-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.close-btn{
    background-color: #ff4d4d;
}

.close-btn,
.confirm-order-btn {
    padding: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.close-btn {
    background-color: #ccc;
    color: #333;
}

.confirm-order-btn {
    background-color: #4CAF50;
    color: white;
}


.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.page-title {
    font-size: 32px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.5px;
}

.search-container {
    position: relative;
    flex: 0 0 360px;
}

.search-input {
    width: 100%;
    padding: 14px 44px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: 15px;
    background-color: var(--surface-color);
    transition: all 0.2s ease;
}

.search-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px rgba(0, 184, 148, 0.1);
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
}

.categories-nav {
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
    overflow-x: auto;
    padding: 4px;
    scrollbar-width: none;
}

.categories-nav::-webkit-scrollbar {
    display: none;
}

.category-pill {
    padding: 10px 20px;
    background-color: var(--surface-color);
    border-radius: 100px;
    font-size: 14px;
    color: var(--text-secondary);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
}

.category-pill.active {
    background-color: var(--accent-color);
    color: white;
}

.featured-recipe {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 48px;
    aspect-ratio: 21/9;
}

.featured-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.featured-recipe:hover .featured-image {
    transform: scale(1.02);
}

.featured-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    color: white;
}

.featured-label {
    display: inline-block;
    padding: 6px 12px;
    background-color: var(--accent-color);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 16px;
}

.featured-title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 8px;
}

.featured-description {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 20px;
}

.view-recipe-btn {
    padding: 12px 24px;
    background-color: #f97316;
    color: var(--text-primary);
    border: none;
    border-radius: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.button-view-menu {
    padding: 12px 24px;
    background-color: #f97316;
    border: none;
    border-radius: 12px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-view-menu:hover {
    background-color: #fb923c; 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.button-view-menu:active {
    background-color: #f97316; 
    transform: scale(0.95); 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.view-recipe-btn:hover {
    transform: translateY(-1px);
}

/* Recipe section */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.section-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
}

.view-all-btn {
    color: var(--accent-color);
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
}

.recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

.recipe-card {
    background-color: var(--background-color);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.2s ease;
}

.recipe-card:hover {
    transform: translateY(-4px);
}

.recipe-image-wrapper {
    position: relative;
    aspect-ratio: 4/3;
}

.recipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.recipe-time {
    position: absolute;
    bottom: 12px;
    right: 12px;
    padding: 6px 12px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 100px;
    font-size: 12px;
}

.recipe-info {
    padding: 20px;
}

.recipe-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.recipe-category {
    font-size: 13px;
    color: var(--text-secondary);
}

.recipe-rating {
    display: flex;
    align-items: center;
    gap: 4px;
}

.rating-number {
    font-weight: 600;
    color: var(--text-primary);
}

.star.filled {
    color: #FFB800;
}

.recipe-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.recipe-chef {
    font-size: 13px;
    color: var(--text-secondary);
}

@media (max-width: 768px) {
    .container {
        padding: 20px;
    }

    .header-section {
        flex-direction: column;
        gap: 20px;
        align-items: stretch;
    }

    .search-container {
        flex: none;
    }

    .featured-content {
        padding: 24px;
    }

    .featured-title {
        font-size: 24px;
    }

    .recipes-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 480px) {
    .recipes-grid {
        grid-template-columns: 1fr;
    }
    .recipe-card {
        grid-template-columns: 2fr;
    }
}
</style>