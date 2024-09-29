import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from "./1firebaseconfig";
import { getAuth } from "firebase/auth";

export const db = getFirestore(app);
const auth = getAuth(app);

type ServiceSaveUserType = {
  email: string;
  userName: string;
  rollNum: string;
  uid: string;
};
export async function serviceSaveUser(userCf: ServiceSaveUserType) {
  let docRef = doc(db, "Users", userCf.uid);
  try {
    await setDoc(docRef, userCf);
  } catch (error) {
    console.log("error=>", error, "serviceSaveUser()");
  }
}

export async function serviceSaveToDo(ToDo: string) {
  const UserUid = auth.currentUser?.uid;
  const ToDos = { todo: ToDo, uid: UserUid };
  let collectionRef = collection(db, "todos");
  try {
    await addDoc(collectionRef, ToDos);
    console.log("serviceSaveToDo() triggerd");
  } catch (error) {
    console.log("error=> Inside serviceSaveToDo", error);
  }
}

///

// Check serviceSaveToDo: Ensure that when you add a new
// to-do, it has the correct uid associated with it. If the uid is incorrect
// or missing, the listener won’t pick it up.

// Here's how your serviceSaveToDo should look:

// export async function serviceSaveToDo(ToDo: string) {
//   const UserUid = auth.currentUser?.uid;
//   const ToDos = { uid: UserUid, todo: ToDo }; // Make sure uid is included
//   const collectionRef = collection(db, "todos");
//   try {
//     await addDoc(collectionRef, ToDos);
//     console.log("ToDo added successfully");
//   } catch (error) {
//     console.error("Error adding ToDo:", error);
//   }
// }
