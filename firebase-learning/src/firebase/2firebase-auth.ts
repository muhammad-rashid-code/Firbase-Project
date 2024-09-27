import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
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

export function serviceSignOut() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.log("error=>", error);
    });
}

export function serviceSendEmailVerification() {
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("email sent insid fun emf");
      })
      .catch(() => {
        console.log("error inside func emf");
      });
  } else {
  }
}
