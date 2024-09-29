"use client";

import { AuthContextExport } from "@/context/auth-context";
import ButtonComponents from "../components/page";
import { serviceSignOut } from "@/firebase/2firebase-auth";
import { useEffect, useState } from "react";
import { auth, db, serviceSaveToDo } from "@/firebase/3firebase-cloudfirestore";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { todo } from "node:test";

export default function Home() {
  const { user } = AuthContextExport()!;
  const [todoHuS, setTodoHuS] = useState<string>("");
  const [allTodosHuS, setAllTodosHuS] = useState<DocumentData[]>([]);
  const [editModeHuS, setEditModeHuS] = useState<boolean>(false);
  const [currentTodoId, setCurrentTodoId] = useState<string>("");
  useEffect(() => {
    const detachOnAuthStateListener: Unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          fetchTodosRealtime();
        } else {
          setAllTodosHuS([]);
        }
      }
    );
    return () => detachOnAuthStateListener();
  }, []);

  const fetchTodosRealtime = () => {
    const collectionRef = collection(db, "todos");
    const currentUserUid = auth.currentUser?.uid;
    const condition = where("uid", "==", currentUserUid);
    let q = query(collectionRef, condition);

    const unsubscirbe: Unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newTodos: DocumentData[] = [];
      querySnapShot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const todo = { ...change.doc.data(), id: change.doc.id };
          newTodos.push(todo);
        }
      });
      setAllTodosHuS((prev) => [...prev, ...newTodos]);
    });
    return unsubscirbe;
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setAllTodosHuS((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = async () => {
    if (currentTodoId) {
      try {
        await updateDoc(doc(db, "todos", currentTodoId), { todo: todoHuS });
        setAllTodosHuS((prev) =>
          prev.map((todo) =>
            todo.id === currentTodoId ? { ...todo, todo: todoHuS } : todo
          )
        );
        setEditModeHuS(false);
        setCurrentTodoId("");
        setTodoHuS("");
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };
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
        btnLabel={editModeHuS ? "Save Changes" : "Add ToDo"}
        btnHandler={
          editModeHuS
            ? handleEditTodo
            : () => {
                serviceSaveToDo(todoHuS);
                setTodoHuS("");
              }
        }
      />
      <br />
      <br />
      {allTodosHuS.length > 0 ? (
        allTodosHuS.map(({ id, todo }) => (
          <div key={id}>
            <h1>
              {todo}{" "}
              <ButtonComponents
                btnLabel={"Edit"}
                btnHandler={() => {
                  setEditModeHuS(true);
                  setCurrentTodoId(id);
                  setTodoHuS(todo);
                }}
              />{" "}
              <ButtonComponents
                btnLabel={"Delete"}
                btnHandler={() => {
                  deleteTodo(id);
                }}
              />
            </h1>
          </div>
        ))
      ) : (
        <h1>Threre are no todos</h1>
      )}
    </>
  );
}
