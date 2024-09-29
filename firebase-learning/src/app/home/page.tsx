"use client";

import { AuthContextExport } from "@/context/auth-context";
import ButtonComponents from "../components/page";
import { serviceSignOut } from "@/firebase/2firebase-auth";
import { useEffect, useState } from "react";
import { auth, db, serviceSaveToDo } from "@/firebase/3firebase-cloudfirestore";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const { user } = AuthContextExport()!;
  const [todoHuS, setTodoHuS] = useState<string>("");
  const [allTodosHuS, setAllTodosHuS] = useState<DocumentData[]>([]);
  useEffect(() => {
    let detachOnAuthStateListner = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodosRealtime();
      }
    });
    return () => {
      if (readTodosRealtime) {
        readTodosRealtime();
        detachOnAuthStateListner();
      }
    };
  }, []);

  let readTodosRealtime: Unsubscribe;

  const fetchTodosRealtime = () => {
    let collectionRef = collection(db, "todos");
    let c = auth.currentUser?.uid;
    let condition = where("uid", "==", c);
    let q = query(collectionRef, condition);
    let allTodosClone = [...allTodosHuS];

    readTodosRealtime = onSnapshot(q, (querySnapShot) => {
      querySnapShot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let todo = change.doc.data();
          todo.id = change.doc.id;
          allTodosClone.push(todo);
          setAllTodosHuS([...allTodosClone]);
        }
      });
    });
  };
  return (
    <>
      <h1>Welcome Home</h1>
      <p>Welcome {user?.email?.split("@")[0]}</p>
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
      <ButtonComponents
        btnLabel={"Signout"}
        btnHandler={() => {
          serviceSignOut();
        }}
      />
      {allTodosHuS.length > 0 ? (
        allTodosHuS.map(({ todo }) => <h1>{todo}</h1>)
      ) : (
        <>
          <p>there is no todo</p>
        </>
      )}
    </>
  );
}
