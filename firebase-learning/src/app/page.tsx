"use client";

import Link from "next/link";
import { useState } from "react";
import ButtonComponents from "./components/page";
import { serviceSignInUser } from "@/firebase/2firebase-auth";

export default function LoginUserFunc() {
  const [emailLuUs, setEmailLuUs] = useState<string>("");
  const [passwordLuUs, setPasswordLuUs] = useState<string>("");
  return (
    <>
      <h1>Login Here</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={emailLuUs}
        onChange={(e) => setEmailLuUs(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={passwordLuUs}
        onChange={(e) => setPasswordLuUs(e.target.value)}
      />
      <br />
      <br />
      <ButtonComponents
        btnLabel={"Login"}
        btnHandler={() => {
          serviceSignInUser({ email: emailLuUs, password: passwordLuUs });
        }}
      />
      <br />
      <br />
      <p>
        <Link href={"sign-up"}>Sign Up</Link> If you don't have an account.
      </p>
    </>
  );
}
