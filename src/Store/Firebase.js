// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
//
// const firebaseConfig = {
//   apiKey: "AIzaSyD4FCoylHTH5ONYjqT9Y1FBTzEqnETsDyM",
//   authDomain: "stringify-f4313.firebaseapp.com",
//   projectId: "stringify-f4313",
//   storageBucket: "stringify-f4313.appspot.com",
//   messagingSenderId: "54257128103",
//   appId: "1:54257128103:web:f33ff5837630711eb24182",
// };
//
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const GoogleAuth = new GoogleAuthProvider();
// const auth = getAuth(app);
// export { db, GoogleAuth };
//func helps
//  useEffect(() => {
//     async function getdata(db) {
//       const mainCollectionName = collection(db, "temp");
//       const docsInMainCollection = await getDocs(mainCollectionName);
//       const convertingDocData = docsInMainCollection.docs.map((doc) =>
//         doc.data()
//       );
//       console.log("list", convertingDocData);
//     }
//     getdata(db);
//   }, []);
//
//
//   useEffect(() => {
//     onSnapshot(collection(db, "temp"), (snapshot) =>
//       console.log(snapshot.docs.map((doc) => doc.data()))
//     );
//   }, []);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4FCoylHTH5ONYjqT9Y1FBTzEqnETsDyM",
  authDomain: "stringify-f4313.firebaseapp.com",
  projectId: "stringify-f4313",
  storageBucket: "stringify-f4313.appspot.com",
  messagingSenderId: "54257128103",
  appId: "1:54257128103:web:f33ff5837630711eb24182",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
