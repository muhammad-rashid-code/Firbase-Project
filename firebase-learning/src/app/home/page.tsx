"use client";

import { AuthContextExport } from "@/context/auth-context";
import ButtonComponents from "../components/page";
import { auth, serviceSignOut } from "@/firebase/2firebase-auth";
import { useEffect, useState } from "react";
import { db, serviceSaveToDo } from "@/firebase/3firebase-cloudfirestore";
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
  const [alltodos, setAlltodos] = useState<DocumentData[]>([]);
  useEffect(() => {
    let detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodosRealtime();
      }
    });

    return () => {
      if (readTodosRealtime) {
        readTodosRealtime();
        detachOnAuthListiner();
      }
    };
  }, []);
  let readTodosRealtime: Unsubscribe;
  const fetchTodosRealtime = () => {
    let collectionRef = collection(db, "todos");
    let currentUserUid = auth.currentUser?.uid;
    let condition = where("uid", "==", currentUserUid);
    let q = query(collectionRef, condition);
    let allTodosClone = [...alltodos];

    readTodosRealtime = onSnapshot(q, (querySnapShot) => {
      querySnapShot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let todo = change.doc.data();
          todo.id = change.doc.id;
          allTodosClone.push(todo);
          setAlltodos([...allTodosClone]);
        }
      });
    });
  };

  // const fetchTodosRealtime = () => {
  //   const collectionRef = collection(db, "todos");
  //   const currentUserUid = auth.currentUser?.uid;
  //   const condition = where("uid", "==", currentUserUid);
  //   const q = query(collectionRef, condition);

  //   // Create a Firestore listener
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const newTodos = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setAlltodos(newTodos); // Update state with the new array of todos
  //   });

  //   // Cleanup function
  //   return () => unsubscribe();
  // };

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
      {alltodos.length > 0 ? (
        alltodos.map(({ todo }) => <h1>{todo}</h1>)
      ) : (
        <></>
      )}
    </>
  );
}
