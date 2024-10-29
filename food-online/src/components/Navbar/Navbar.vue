<template>
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-container">
      <div class="navbar-content">
        <div class="navbar-logo" @mouseover="logoHovered = true" @mouseleave="logoHovered = false">
          <span :class="['logo-text', { 'logo-hovered': logoHovered }]">DeliD</span>
          <div :class="['logo-dot', { 'logo-dot-visible': logoHovered }]"></div>
        </div>

        <div class="navbar-menu">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="menu-item"
            @mouseover="hoveredItem = item.name"
            @mouseleave="hoveredItem = null"
          >
            {{ item.name }}
            <div :class="['menu-item-underline', { 'underline-active': hoveredItem === item.name }]"></div>
          </router-link>
        </div>

        <transition name="search">
          <div v-show="showSearch" class="search-container">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="ค้นหาเมนูอาหาร..."
              @keyup.enter="handleSearch"
            />
          </div>
        </transition>

        <div class="navbar-actions">
          <!-- <button class="search-toggle" @click="toggleSearch">
            <i class="fas fa-search"></i>
          </button>
          
          <button class="cart-button" @click="handleCartClick">
            <i class="fas fa-shopping-cart"></i>
            <transition name="cart-count">
              <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
            </transition>
          </button> -->

          <!-- <button class="login-button" @mouseover="loginHovered = true" @mouseleave="loginHovered = false">
            <div :class="['login-button-background', { 'background-active': loginHovered }]"></div>
            <i class="fas fa-user"></i>
            <span>เข้าสู่ระบบ</span>
          </button> -->
        </div>

        <button :class="['mobile-menu-button', { 'is-active': isMenuOpen }]" @click="toggleMenu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <transition name="mobile-menu">
        <div v-if="isMenuOpen" class="mobile-menu">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="mobile-menu-item"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          <div class="mobile-menu-actions">
            <button class="mobile-login-button">
              <i class="fas fa-user"></i>
              <span>เข้าสู่ระบบ</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const showSearch = ref(false);
const searchQuery = ref('');
const cartCount = ref(0);
const logoHovered = ref(false);
const loginHovered = ref(false);
const hoveredItem = ref(null);
const menuItems = ref([
  { name: 'หน้าแรก', path: '/' },
  { name: 'เมนูอาหาร', path: '/menu' },
  { name: 'โปรโมชั่น', path: '/promotions' },
]);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => {
      document.querySelector('.search-input').focus();
    });
  }
};

const handleSearch = () => {
  console.log('Searching for:', searchQuery.value);
  searchQuery.value = '';
  showSearch.value = false;
};

const handleCartClick = () => {
  cartCount.value++;
  const cartButton = document.querySelector('.cart-button');
  cartButton.classList.add('cart-bump');
  setTimeout(() => {
    cartButton.classList.remove('cart-bump');
  }, 300);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    transition: all 0.3s ease;
    font-family: "Kanit";
  }

  button{
    font-family: "Kanit";
  }
  
  .navbar-scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }
  
  /* Logo Styles */
  .navbar-logo {
    position: relative;
    cursor: pointer;
  }
  
  .logo-text {
    color: #f97316;
    font-weight: 700;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    font-family: "DynaPuff";
  }
  
  .logo-hovered {
    transform: translateX(-4px);
  }
  
  .logo-dot {
    position: absolute;
    right: -8px;
    bottom: 4px;
    width: 6px;
    height: 6px;
    background-color: #f97316;
    border-radius: 50%;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  a{
    cursor: pointer;
  }
  
  .logo-dot-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Menu Styles */
  .navbar-menu {
    display: none;
  }
  
  .menu-item {
    position: relative;
    color: #4b5563;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: color 0.2s ease;
    cursor: pointer;
  }
  
  .menu-item:hover {
    color: #f97316;
  }
  
  .menu-item-underline {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #f97316;
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }
  
  .underline-active {
    width: 80%;
  }
  
  /* Search Styles */
  .search-container {
    position: absolute;
    right: 180px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .search-input {
    width: 200px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    background-color: #f3f4f6;
    transition: all 0.3s ease;
  }
  
  .search-enter-active,
  .search-leave-active {
    transition: all 0.3s ease;
  }
  
  .search-enter,
  .search-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(20px);
  }
  
  /* Cart Button Styles */
  .cart-button {
    position: relative;
    padding: 0.5rem;
    color: #4b5563;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  
  .cart-count {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #f97316;
    color: white;
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    transform: translate(25%, -25%);
  }
  
  .cart-bump {
    animation: cartBump 0.3s ease;
  }
  
  @keyframes cartBump {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  /* Login Button Styles */
  .login-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    color: #f97316;
    background: none;
    border: 1px solid #f97316;
    border-radius: 9999px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.3s ease;
  }
  
  .login-button-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f97316;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .background-active {
    transform: translateX(0);
  }
  
  .login-button:hover {
    color: white;
  }
  
  /* Mobile Menu Button */
  .mobile-menu-button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 20px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: #4b5563;
    transition: all 0.3s ease;
  }

  a{
    cursor: pointer;
  }
  
  .mobile-menu-button.is-active .hamburger-line:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .mobile-menu-button.is-active .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-button.is-active .hamburger-line:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
  
  /* Mobile Menu */
  .mobile-menu {
    background-color: white;
    padding: 1rem 0;
    border-top: 1px solid #e5e7eb;
  }
  
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: all 0.3s ease;
  }
  
  .mobile-menu-enter,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .mobile-menu-item {
    display: block;
    padding: 0.75rem 1rem;
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .mobile-menu-item:hover {
    color: #f97316;
  }
  
  .mobile-menu-actions {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    margin-top: 0.5rem;
  }
  
  .mobile-login-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    color: white;
    background-color: #f97316;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .mobile-login-button:hover {
    background-color: #ea580c;
  }
  
  @media (min-width: 768px) {
    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  
    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .mobile-menu-button {
      display: none;
    }
  }
  </style>
