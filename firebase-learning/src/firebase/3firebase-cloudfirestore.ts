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
export const auth = getAuth(app);

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
