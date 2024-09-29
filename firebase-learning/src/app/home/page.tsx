// "use client";

// import { AuthContextExport } from "@/context/auth-context";
// import ButtonComponents from "../components/page";
// import { serviceSignOut } from "@/firebase/2firebase-auth";
// import { useEffect, useState } from "react";
// import { auth, db, serviceSaveToDo } from "@/firebase/3firebase-cloudfirestore";
// import {
//   collection,
//   DocumentData,
//   onSnapshot,
//   query,
//   Unsubscribe,
//   where,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// export default function Home() {
//   const { user } = AuthContextExport()!;
//   const [todoHuS, setTodoHuS] = useState<string>("");
//   const [allTodoHuS, setAllTodoHuS] = useState<DocumentData[]>([]);

//   useEffect(() => {
//     const detachOnAuthStateListener = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchTodosRealtime();
//       } else {
//         setAllTodoHuS([]); // Clear todos on sign out
//       }
//     });

//     return () => detachOnAuthStateListener();
//   }, []);

//   const fetchTodosRealtime = () => {
//     const collectionRef = collection(db, "todos");
//     const currentUserUid = auth.currentUser?.uid;
//     const condition = where("uid", "==", currentUserUid);
//     const q = query(collectionRef, condition);

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const newTodos: DocumentData[] = [];
//       querySnapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const todo = { ...change.doc.data(), id: change.doc.id };
//           newTodos.push(todo);
//         }
//       });
//       setAllTodoHuS((prev) => [...prev, ...newTodos]);
//     });

//     return unsubscribe; // Return the unsubscribe function for cleanup
//   };

//   return (
//     <>
//       <h1>Welcome Home</h1>
//       <p>Welcome {user?.email?.split("@")[0]}</p>
//       <br />
//       <br />
//       <label htmlFor="todoHuS">Add ToDo:</label>
//       <input
//         type="text"
//         id="todoHuS"
//         value={todoHuS}
//         onChange={(e) => setTodoHuS(e.target.value)}
//       />
//       <ButtonComponents
//         btnLabel={"Add ToDo"}
//         btnHandler={() => {
//           serviceSaveToDo(todoHuS);
//           setTodoHuS("");
//         }}
//       />
//       <br />
//       <br />
//       <ButtonComponents
//         btnLabel={"Signout"}
//         btnHandler={serviceSignOut}
//       />
//       {allTodoHuS.length > 0 ? (
//         allTodoHuS.map(({ id, todo }) => <h1 key={id}>{todo}</h1>)
//       ) : (
//         <h1>There are no todos</h1>
//       )}
//     </>
//   );
// }

// `State Management: Avoid mutating the state directly. Instead of cloning the state array and then pushing to it, you can directly update the state using the updater function.

// Unsubscribe Cleanup: Make sure the readTodosRealtime variable is correctly scoped for cleanup to avoid potential memory leaks.

// Use Proper Types: If you’re using TypeScript, ensure that your types are explicitly defined for better type checking.

// Rendering Lists: Use a unique key prop when rendering lists of items to help React identify which items have changed.`


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
  const [allTodoHuS, setAllTodoHuS] = useState<DocumentData[]>([]);

  useEffect(() => {
    const detachOnAuthStateListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodosRealtime();
      } else {
        setAllTodoHuS([]); // Clear todos on sign out
      }
    });

    return () => detachOnAuthStateListener();
  }, []);

  const fetchTodosRealtime = () => {
    const collectionRef = collection(db, "todos");
    const currentUserUid = auth.currentUser?.uid;
    const condition = where("uid", "==", currentUserUid);
    const q = query(collectionRef, condition);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTodos: DocumentData[] = [];
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const todo = { ...change.doc.data(), id: change.doc.id };
          newTodos.push(todo);
        }
      });
      setAllTodoHuS((prev) => [...prev, ...newTodos]);
    });

    return unsubscribe; // Return the unsubscribe function for cleanup
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
      />
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
        btnHandler={serviceSignOut}
      />
      {allTodoHuS.length > 0 ? (
        allTodoHuS.map(({ id, todo }) => <h1 key={id}>{todo}</h1>)
      ) : (
        <h1>There are no todos</h1>
      )}
    </>
  );
}


// `Key Changes:
// Removed the readTodosRealtime variable declaration outside the function and encapsulated it within the fetchTodosRealtime function.
// Used the updater function in setAllTodoHuS for better state management.
// Added a key prop when mapping through allTodoHuS to ensure unique identification.
// Cleared the todos on sign out to avoid displaying stale data.`