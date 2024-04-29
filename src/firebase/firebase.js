// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, QuerySnapshot } from "firebase/firestore";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { ref, onUnmounted, reactive } from "vue"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "hogehoge",
  authDomain: "hogehoge",
  projectId: "hogehoge",
  storageBucket: "hogehoge",
  messagingSenderId: "hogehoge",
  appId: "hogehoge"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore();

const q = query(collection(db, "todos-item"));
export const updateTodos = () => {

    let todos = reactive([])

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        QuerySnapshot.docChanges().forEach((change) => {
            if(change.type === "added"){
                todos.push({
                    ...change.doc.data(),id:change.doc.id
                })
            }
            if(change.type === "modified"){
                console.log("modified", change.doc.data());
            }
            if(change.type === "removed"){
                console.log("removed", change.doc.data());
            }
        })
    })

    onUnmounted(unsubscribe)

    return todos
}

export const allData = async () => {
}
