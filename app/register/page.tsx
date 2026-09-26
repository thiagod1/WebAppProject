"use client";
import { useState } from "react";
export default function RegisterPage() {

  interface User {
    id: number
    email: string
    password:string
    createdAt:Date
    updatedAt?:Date
    name?: string
  }

  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Date>(new Date())
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date())

  function createUser(createdID: number, email: string, password: string, createdAt: Date, name?: string): User {
    return {
      id: createdID,
      email:email,
      password:password,
      createdAt:createdAt,
      name: name === "" ? undefined : name,
    }
  }

  function click() {
    const createID:number = Math.floor(Math.random() * (10000 - 1)) + 1;
    const newUser = createUser(createID, email,password, createdAt, name);
    setUser(newUser);
    console.log(newUser)
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm">
    <h1>This is the register page</h1>
    <p>For the newsletter app</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={click} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Create User </button>

      {user && <pre>{JSON.stringify(user)}</pre>}
      {user && <p>Created user: {user.name} (id: {user.id}) (Email: {user.email})</p>}
    </div>
  );
}
