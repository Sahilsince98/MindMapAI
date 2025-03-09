// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyC8k7ksidXgPXhlxJqCIyepMEmESLt1WsA",
  authDomain: "mindmap-ai-6c12c.firebaseapp.com",
  projectId: "mindmap-ai-6c12c",
  storageBucket: "mindmap-ai-6c12c.firebasestorage.app",
  messagingSenderId: "642439593711",
  appId: "1:642439593711:web:878f0d4fadf78291f1e51a",
  measurementId: "G-H7GKV8QNTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
;
export const auth=getAuth()
export const db=getFirestore(app)
export default app