import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./1firebaseconfig";

const auth = getAuth(app);

type ServiceSignUpUserType = { email: string; password: string };
export function serviceSignUpUser(userSu: ServiceSignUpUserType) {
  createUserWithEmailAndPassword(auth, userSu.email, userSu.password)
    .then((userCredential) => {
      const { email, emailVerified, uid } = userCredential.user;
      console.log(
        "email=>",
        email,
        "uid=>",
        uid,
        "emailVerified=>",
        emailVerified,
        "Inside SignUp"
      );
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(
        "errorMessage=>",
        errorMessage,
        "errorCode=>",
        errorCode,
        "Inside SignUp"
      );
    });
}

type ServiceSignInUser = { email: string; password: string };
export function serviceSignInUser(userSi: ServiceSignInUser) {
  signInWithEmailAndPassword(auth, userSi.email, userSi.password)
    .then((userCredential) => {
      const { email, emailVerified, uid } = userCredential.user;
      console.log(
        "email=>",
        email,
        "uid=>",
        uid,
        "emailVerified=>",
        emailVerified,
        "Inside SignIn"
      );
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(
        "errorMessage=>",
        errorMessage,
        "errorCode=>",
        errorCode,
        "Inside SignUp"
      );
    });
}
