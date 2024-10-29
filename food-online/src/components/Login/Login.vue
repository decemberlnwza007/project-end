<template>
    <center>
        <div class="success-animation"></div>
        <div class="login-container">
            <div class="stars">✧</div>
            <h2>ยินดีต้อนรับ</h2>
            <p class="subtitle">เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน</p>

            <form @submit.prevent="handleSubmit" id="loginForm">
                <div class="form-group">
                    <label for="email">อีเมล</label>
                    <div class="input-wrapper">
                        <input type="email" id="email" placeholder="กรุณากรอกอีเมล" required v-model="username" @focus="focusLabel('email')" @blur="blurLabel('email')" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">รหัสผ่าน</label>
                    <div class="input-wrapper">
                        <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="กรุณากรอกรหัสผ่าน" required v-model="password" @focus="focusLabel('password')" @blur="blurLabel('password')" />
                        <span class="input-icon password-toggle" @click="togglePassword"></span>
                    </div>
                    <div class="strength-meter">
                        <div :style="{ width: strength + '%' }" :class="strengthClass"></div>
                    </div>
                </div>
                
                <button type="submit" class="login">เข้าสู่ระบบ</button>
                
                <div class="separator">หรือ</div>

                <button style="width: 45%;" class="facebook">FACEBOOK</button>
                &nbsp;
                &nbsp;
                &nbsp;
                <button style="width: 45%;" type="button" class="google" @click="loginWithGoogle" @submit="handleSubmit">GOOGLE</button>

                <div class="links">
                    <a href="register.html" class="register-link">ลงทะเบียน</a>
                    <a href="#" class="forgot-link">ลืมรหัสผ่าน?</a>
                </div>
            </form>
        </div>
    </center>
</template>

<script setup>
import { ref, computed } from 'vue';
import { auth, provider } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const strength = ref(0);
const strengthClass = computed(() => {
    if (strength.value <= 25) return 'weak';
    if (strength.value <= 50) return 'medium';
    if (strength.value <= 75) return 'strong';
    return 'very-strong';
});

const loginWithGoogle = async () => {
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Logged in with google', user);
        showSuccessAnimation();
        router.push('/Home');
    }catch(error){
        console.error('Error during google login:', error)
    }
}

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const focusLabel = (field) => {
    const label = document.querySelector(`label[for="${field}"]`);
    if (label) label.style.color = '#6366f1';
};

const blurLabel = (field) => {
    const label = document.querySelector(`label[for="${field}"]`);
    if (label) label.style.color = '#4b5563';
};

const handleSubmit = async () => {
    const value = password.value;
    strength.value = 0;

    if (value.length >= 8) strength.value += 25;
    if (/[A-Z]/.test(value)) strength.value += 25;
    if (/[0-9]/.test(value)) strength.value += 25;
    if (/[^A-Za-z0-9]/.test(value)) strength.value += 25;

    if (strength.value === 100) {
        try {
            await signInWithEmailAndPassword(auth, username.value, password.value);
            showSuccessAnimation();
            // Redirect or take action after successful login
        } catch (error) {
            console.error("Error logging in:", error);
            alert("เข้าสู่ระบบล้มเหลว! กรุณาตรวจสอบข้อมูลของคุณ");
        }
    }
};

const showSuccessAnimation = () => {
    const successAnimation = document.querySelector('.success-animation');
    successAnimation.style.display = 'block';

    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'white';
    message.style.padding = '2rem';
    message.style.borderRadius = '1rem';
    message.innerHTML = `
        <h3 style="color: #6366f1; margin-bottom: 1rem;">เข้าสู่ระบบสำเร็จ! 🎉</h3>
        <p style="color: #6b7280;">กำลังนำคุณไปยังหน้าหลัก...</p>
    `;

    successAnimation.appendChild(message);

    setTimeout(() => {
        successAnimation.style.display = 'none';
        successAnimation.innerHTML = '';
        document.body.style.overflow = 'auto';
    }, 3000);
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

.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #000;
}

.separator:not(:empty)::before {
  margin-right: .25em;
}

.separator:not(:empty)::after {
  margin-left: .25em;
}

body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 50%, #faf5ff 100%);
    position: relative;
    overflow: hidden;
}

.floating-bubble {
    position: absolute;
    background: linear-gradient(45deg, #818cf8, #6366f1);
    border-radius: 50%;
    pointer-events: none;
    animation: float 15s infinite linear;
    opacity: 0.1;
}

@keyframes float {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }

    100% {
        transform: translate(400px, -400px) rotate(360deg);
    }
}

.login-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 2.5rem;
    border-radius: 1.5rem;
    box-shadow:
        0 10px 25px rgba(99, 102, 241, 0.1),
        0 6px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
}


/* .login-container:hover {
    transform: translateY(-5px);
} */

.login-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #818cf8, #6366f1, #818cf8);
}

.stars {
    font-size: 2.5rem;
    background: linear-gradient(45deg, #818cf8, #6366f1);
    /* -webkit-background-clip: text; */
    color: transparent;
    margin-bottom: 1rem;
    display: inline-block;
    animation: sparkle 2s infinite;
}

@keyframes sparkle {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.1);
    }
}

h2 {
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    font-weight: 500;
}

.subtitle {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 2rem;
    font-weight: 300;
}

.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
    position: relative;
}

label {
    display: block;
    color: #4b5563;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
    transition: color 0.3s ease;
}

.input-wrapper {
    position: relative;
}

input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    outline: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 300;
    padding-right: 2.5rem;
}

input:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
}

.input-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    transition: color 0.3s ease;
}

input:focus+.input-icon {
    color: #6366f1;
}

.password-toggle {
    cursor: pointer;
}

.strength-meter {
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    margin-top: 0.5rem;
    overflow: hidden;
    display: none;
}

.strength-meter div {
    height: 100%;
    width: 0;
    transition: all 0.3s ease;
}

.login {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(45deg, #818cf8, #6366f1);
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-weight: 400;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
}

.facebook{
    padding: 1rem;
    background-color: #1877F2;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-weight: 400;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
}

.google{
    border: solid 1px;
    border-color: #76BC43;
    padding: 1rem;
    background-color: #ffffff;
    color: black;
    border-radius: 0.75rem;
    font-weight: 400;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
}

.google:hover{
    color: white;
    border: none;
    background-color: #76BC43;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.google:after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    transition: 0.5s;
}

.facebook::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    transition: 0.5s;
}

.facebook:hover{
    background-color: #0a5bc5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.login::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
}

.login:hover::after {
    left: 100%;
}

.login:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.links {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
    font-weight: 300;
}

.links a {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
}

.links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #818cf8, #6366f1);
    transition: width 0.3s ease;
}

.links a:hover::after {
    width: 100%;
}

.success-animation {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(99, 102, 241, 0.2);
    z-index: 1000;
}

@keyframes success {
    from {
        transform: scale(0);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>