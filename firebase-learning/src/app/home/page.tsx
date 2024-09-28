"use client";

import { AuthContextExport } from "@/context/auth-context";
import ButtonComponents from "../components/page";
import { serviceSignOut } from "@/firebase/2firebase-auth";

export default function Home() {
  const { user } = AuthContextExport()!;
  return (
    <>
      <h1>Welcome Home</h1>
      <p>Welcome {user?.email?.split("@")[0]}</p>
      <br />
      <br />
      <ButtonComponents
        btnLabel={"Signout"}
        btnHandler={() => {
          serviceSignOut();
        }}
      />
    </>
  );
}
