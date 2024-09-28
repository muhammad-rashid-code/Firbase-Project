import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./1firebaseconfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
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
