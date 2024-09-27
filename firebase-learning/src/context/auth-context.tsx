"use client";

import { app } from "@/firebase/1firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  email: string | null;
  uid: string;
  emailVerified: boolean | null;
};
type AuthContextCreateType = { user: UserType | null };

const AuthContextCreate = createContext<AuthContextCreateType | null>(null);

type AuthContextFuncType = { children: React.ReactNode };
export default function AuthContextFunc({ children }: AuthContextFuncType) {
  const [userAcUs, setUserAcUs] = useState<UserType | null>(null);
  const auth = getAuth(app);
  const route = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        const { email, emailVerified, uid } = loggedInUser;
        if (!emailVerified) {
          route.push("verify-email");
        } else {
          setUserAcUs({ email, emailVerified, uid });
          route.push("home");
        }
      } else {
        setUserAcUs(null);
        route.push("/");
      }
    });
  }, []);
  return (
    <AuthContextCreate.Provider value={{ user: userAcUs }}>
      {children}
    </AuthContextCreate.Provider>
  );
}
export const AuthContextExport = () => useContext(AuthContextCreate);
