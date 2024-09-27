"use client";

import { AuthContextExport } from "@/context/auth-context";

export default function Home() {
  const { user } = AuthContextExport()!;
  return (
    <>
      <h1>Welcome Home</h1>
      <p>Welcome {user?.email?.split("@")[0]}</p>
    </>
  );
}
