"use client";

import { AuthContextExport } from "@/context/auth-context";
import ButtonComponents from "../components/page";
import { serviceSignOut } from "@/firebase/2firebase-auth";
import { useState } from "react";
import { serviceSaveToDo } from "@/firebase/3firebase-cloudfirestore";

export default function Home() {
  const { user } = AuthContextExport()!;
  const [todoHuS, setTodoHuS] = useState<string>("");
  return (
    <>
      <h1>Welcome Home</h1>
      <p>
        Welcome {user?.email?.split("@")[0]}{" "}
        <ButtonComponents
          btnLabel={"Signout"}
          btnHandler={() => {
            serviceSignOut();
          }}
        />
      </p>
      <br />
      <br />
      <label htmlFor="todoHuS">Add ToDo:</label>
      <input
        type="text"
        id="todoHuS"
        value={todoHuS}
        onChange={(e) => setTodoHuS(e.target.value)}
      />{" "}
      <ButtonComponents
        btnLabel={"Add ToDo"}
        btnHandler={() => {
          serviceSaveToDo(todoHuS);
          setTodoHuS("");
        }}
      />
      <br />
      <br />
    </>
  );
}
