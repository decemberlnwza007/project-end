import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBl-3VmAzomBcGLGv-b8UqQFDJTuFdtY9k",
  authDomain: "food-1b519.firebaseapp.com",
  projectId: "food-1b519",
  storageBucket: "food-1b519.appspot.com",
  messagingSenderId: "573944730147",
  appId: "1:573944730147:web:9f69381a211443b9e29796",
  measurementId: "G-C4QBTV7KC7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };