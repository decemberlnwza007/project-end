<template>
    <div class="page-container">
        <div class="food-background"></div>
        <div class="login-container">
            <div class="logo-container">
                <div class="logo">🍽️</div>
                <h2 class="head">สมัครสมาชิกใหม่</h2>
            </div>

            <form @submit.prevent="handleSubmit" id="loginForm">
                <div class="form-group">
                    <label for="email">อีเมล</label>
                    <div class="input-wrapper">
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="example@email.com" 
                            required 
                            v-model="email"
                            @focus="focusLabel('email')" 
                            @blur="blurLabel('email')"
                        />
                        <span class="input-icon"><OhVueIcon name="md-email" /></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">รหัสผ่าน</label>
                    <div class="input-wrapper">
                        <input 
                            :type="showPassword ? 'text' : 'password'" 
                            id="password" 
                            placeholder="กรุณากรอกรหัสผ่าน" 
                            required 
                            v-model="password"
                            @focus="focusLabel('password')" 
                            @blur="blurLabel('password')"
                        />
                        <span 
                            class="input-icon password-toggle" 
                            @click="togglePassword"
                        >
                        <OhVueIcon name="fa-unlock" />
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="username">ชื่อผู้ใช้</label>
                    <div class="input-wrapper">
                        <input 
                            type="text"
                            id="username" 
                            placeholder="กรุณากรอกชื่อผู้ใช้" 
                            required 
                            v-model="username"
                            @focus="focusLabel('username')" 
                            @blur="blurLabel('username')"
                        />
                        <span 
                            class="input-icon password-toggle" 
                        >
                        <OhVueIcon name="fa-unlock" />
                        </span>
                    </div>
                </div>
                
                <button type="submit" class="login-btn">
                    สมัครสมาชิก
                    <OhVueIcon name="md-lunchdining" style="width: 22px; height: 22px;" />
                </button>
                
                <!-- <div class="separator">
                    <span>หรือเข้าสู่ระบบด้วย</span>
                </div>

                <div class="social-buttons">
                    <button class="social-btn facebook">
                        <OhVueIcon name="io-logo-facebook" />
                        Facebook
                    </button>
                    <button class="social-btn google" @click="loginWithGoogle">
                        <OhVueIcon name="pr-google" />
                        Google
                    </button>
                </div> -->

                <div class="links">
                    <a href="register.html" class="register-link">
                        <OhVueIcon name="md-login-twotone" /> เข้าสู่ระบบ
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { auth, provider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { IoLogoFacebook, PrGoogle, MdLunchdining, MdEmail, FaUnlock, FaUserPlus, HiSolidLockClosed, MdLoginTwotone  } from 'oh-vue-icons/icons';

const icons = {
    IoLogoFacebook,
    PrGoogle,
    MdLunchdining,
    MdEmail,
    FaUnlock,
    FaUserPlus,
    HiSolidLockClosed,
    MdLoginTwotone
}

addIcons(IoLogoFacebook);
addIcons(PrGoogle);
addIcons(MdLunchdining);
addIcons(MdEmail);
addIcons(FaUnlock);
addIcons(FaUserPlus);
addIcons(HiSolidLockClosed);
addIcons(MdLoginTwotone);

const router = useRouter();
const username = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const focusLabel = (field) => {
    const label = document.querySelector(`label[for="${field}"]`);
    if (label) label.style.color = '#FF6B6B';
};

const blurLabel = (field) => {
    const label = document.querySelector(`label[for="${field}"]`);
    if (label) label.style.color = '#4A5568';
};

const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        showSuccessMessage();
        router.push('/menu');
    } catch (error) {
        console.error('Error during google login:', error);
        showErrorMessage('การเข้าสู่ระบบล้มเหลว กรุณาลองใหม่อีกครั้ง');
    }
};

const handleSubmit = async () => {
    try {
        await signInWithEmailAndPassword(auth, username.value, password.value);
        showSuccessMessage();
        router.push('/menu');
    } catch (error) {
        console.error("Error logging in:", error);
        showErrorMessage('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
};

const showSuccessMessage = () => {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <div class="success-icon">🎉</div>
            <h3>เข้าสู่ระบบสำเร็จ!</h3>
            <p>กำลังพาคุณไปยังเมนูอาหาร...</p>
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
};

const showErrorMessage = (text) => {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = `
        <div class="error-content">
            <div class="error-icon">⚠️</div>
            <p>${text}</p>
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Kanit';
}



.head{
    color: #f97316;
}

.page-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFF5F5;
    position: relative;
    padding: 2rem;
}

.food-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        url('/api/placeholder/1920/1080') center/cover;
    filter: blur(8px);
    z-index: 0;
}

.login-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 
        0 10px 25px rgba(255, 107, 107, 0.1),
        0 6px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
}

.logo-container {
    text-align: center;
    margin-bottom: 2rem;
}

.logo {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

h2 {
    color: #FF6B6B;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: #4A5568;
    font-size: 1rem;
    font-weight: 300;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    color: #4A5568;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    transition: color 0.3s;
}

.input-wrapper {
    position: relative;
}

input {
    width: 100%;
    padding: 0.875rem 1rem;
    padding-right: 2.5rem;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s;
}

input:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
    outline: none;
}

.input-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #A0AEC0;
    cursor: pointer;
    transition: color 0.3s;
}

.login-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #ff6a00, #f97316);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.btn-icon {
    font-size: 1.2rem;
}

.separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    color: #718096;
}

.separator span {
    padding: 0 1rem;
    background: white;
    font-size: 0.9rem;
}

.separator::before,
.separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E2E8F0;
}

.social-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.social-btn {
    flex: 1;
    padding: 0.75rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.social-btn img {
    width: 20px;
    height: 20px;
}

.facebook {
    background: #1877F2;
    color: white;
    border: none;
}

.google {
    background: white;
    color: #4A5568;
    border: 1px solid #E2E8F0;
}

.facebook:hover,
.google:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.links {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
}

.links a {
    color: #4A5568;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.links a:hover {
    color: #FF6B6B;
}

.success-message,
.error-message {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
    z-index: 1000;
}

.success-content,
.error-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.success-message {
    border-left: 4px solid #48BB78;
}

.error-message {
    border-left: 4px solid #F56565;
}

.success-icon,
.error-icon {
    font-size: 1.5rem;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 2rem;
    }
    
    .social-buttons {
        flex-direction: column;
    }
    
    .links {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>