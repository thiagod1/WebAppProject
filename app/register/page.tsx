"use client";
import { useState } from "react";
import { User } from "@/types"


export default function RegisterPage() {

  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Date>(new Date())
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date())
  const [userStorage, setUserStorage] = useState<User[]>([])


  function validatePassword(password:string):boolean{
    //One lowercase
    //One uppercase
    //One Digit
    //One special character
    //At least 8 char long
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if(password.match(regex)){
      return true
    }
    return false;
  }
  function validateEmail(email:string):boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(email.match(regex)){
      return true;
    }
    return false;
  }
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
    if (!validateEmail(email)){
      console.log("Enter a valid email")
    }
    if(!validatePassword(password)){
      console.log("Enter a valid password")
    }
    if (validateEmail(email) && validatePassword(password)){
      const newUser = createUser(createID, email,password, createdAt, name);
      setUser(newUser);
      console.log(newUser)
      setUserStorage(prev=> [...prev, newUser])
      localStorage.setItem("users", JSON.stringify(userStorage))
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm">
    <h1>This is the register page</h1>
    <p>For the newsletter app</p>
      <input
        type="text"
        placeholder="Enter your name (Optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={click} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Create User </button>

      {user && <pre>{JSON.stringify(user)}</pre>}
      {user && <p>Created user: {user.name} (id: {user.id}) (Email: {user.email})</p>}
    </div>
  );
}
