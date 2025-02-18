import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzzXj_XC3FEqloRqrQQQmaqzonKjrxD-w",
  authDomain: "ratearab-d5915.firebaseapp.com",
  projectId: "ratearab-d5915",
  storageBucket: "ratearab-d5915.firebasestorage.app",
  messagingSenderId: "937739150125",
  appId: "1:937739150125:web:b951cacbbcecdbf0f2a9a4"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
