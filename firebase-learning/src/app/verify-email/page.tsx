"use client";

import { AuthContextExport } from "@/context/auth-context";
import ButtonComponents from "../components/page";
import {
  serviceSendEmailVerification,
  serviceSignOut,
} from "@/firebase/2firebase-auth";

export default function VerifyEmailFunc() {
  const { user } = AuthContextExport()!;
  return (
    <>
      <h1>Check Your inbox {user?.email}</h1>
      <br />
      <br />
      <ButtonComponents
        btnLabel={"Signout"}
        btnHandler={() => {
          serviceSignOut();
        }}
      />
      <br />
      <br />
      <ButtonComponents
        btnLabel={"Resend Email"}
        btnHandler={() => {
          serviceSendEmailVerification();
        }}
      />
    </>
  );
}
