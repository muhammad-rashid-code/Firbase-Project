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

  let readTodosRealtime: Unsubscribe;

  const fetchTodosRealtime = () => {
    let collectionRef = collection(db, "todos");
    let currentUserUid = auth.currentUser?.uid;
    if (!currentUserUid) return; // Ensure user is authenticated

    let condition = where("uid", "==", currentUserUid);
    let q = query(collectionRef, condition);

    readTodosRealtime = onSnapshot(q, (querySnapShot) => {
      const newTodos = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllTodosHuS(newTodos); // Set all todos at once
    });
  };

  // Ensure readTodosRealtime is initialized before use
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodosRealtime();
      }
    });

    return () => {
      if (readTodosRealtime) {
        readTodosRealtime();
      }
      unsubscribeAuth();
    };
  }, []);

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
        allTodosHuS.map(({ id, todo }) => <h1 key={id}>{todo}</h1>)
      ) : (
        <h1>No Todos Available</h1>
      )}
    </>
  );
}
