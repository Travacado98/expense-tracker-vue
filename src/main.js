import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createApp } from "vue";

import App from "@/App.vue";
import Btn from "@/components/Btn.vue";
import FormInput from "@/components/FormInput.vue";
import "@/scss/global.scss";

const firebaseConfig = {
  apiKey: "AIzaSyApPnFXSSj0JcBNMFKROpewPm0cQCDxlh0",
  authDomain: "expense-tracker-95ecd.firebaseapp.com",
  projectId: "expense-tracker-95ecd",
  storageBucket: "expense-tracker-95ecd.appspot.com",
  messagingSenderId: "200945708018",
  appId: "1:200945708018:web:066be93f6480ca754ed96b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = createApp(App);
app.component("Btn", Btn);
app.component("FormInput", FormInput);
app.config.globalProperties.$db = db;
app.mount("#app");
