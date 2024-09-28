"use client";

import Link from "next/link";
import { useState } from "react";
import ButtonComponents from "../components/page";
import { serviceSignUpUser } from "@/firebase/2firebase-auth";

export default function LoginUserFunc() {
  const [emailSuUs, setEmailSuUs] = useState<string>("");
  const [passwordSuUs, setPasswordSuUs] = useState<string>("");
  const [userNameSuUs, setUserNameSuUs] = useState<string>("");
  const [rollNumSuUs, setRollNumSuUs] = useState<string>("");
  return (
    <>
      <h1>Signup Here</h1>
      <label htmlFor="rollNumSuUs">Roll Number:</label>
      <input
        type="text"
        id="rollNumSuUs"
        value={rollNumSuUs}
        onChange={(e) => setRollNumSuUs(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="userNameSuUs">User Name:</label>
      <input
        type="text"
        id="userNameSuUs"
        value={userNameSuUs}
        onChange={(e) => setUserNameSuUs(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={emailSuUs}
        onChange={(e) => setEmailSuUs(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={passwordSuUs}
        onChange={(e) => setPasswordSuUs(e.target.value)}
      />
      <br />
      <br />
      <ButtonComponents
        btnLabel={"Signup"}
        btnHandler={() => {
          serviceSignUpUser({
            email: emailSuUs,
            password: passwordSuUs,
            rollNum: rollNumSuUs,
            userName: userNameSuUs,
          });
        }}
      />
      <br />
      <br />
      <p>
        <Link href={"/"}>Sign In</Link> If you have an account.
      </p>
    </>
  );
}
