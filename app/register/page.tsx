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
  const [isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)
  const [userStorage, setUserStorage] = useState<User[]>([])


  function validatePassword(password:string):boolean{
    //One lowercase
    //One uppercase
    //One Digit
    //One special character
    //At least 8 char long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if(password.match(passwordRegex)){
      return true
    }
    return false;
  }
  function validateEmail(email:string):boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(email.match(emailRegex)){
      return true;
    }
    return false;
  }
  function createUser(createdID: number, email: string, password: string, createdAt: Date, name?: string, isLoggedIn?:boolean): User {
    return {
      id: createdID,
      email:email,
      password:password,
      createdAt:createdAt,
      name: name === "" ? undefined : name,
      isLoggedIn:isLoggedIn,
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
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Enter your Name (Optional)</label>
        <input
          className="input"
          placeholder="Name(Optional)"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="label">Enter your Email</label>
        <input
          className="input"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Enter your password</label>
        <input
          className="input"
          placeholder="Password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={click} className="btn btn-primary"> Create User </button>
      </fieldset>
      {user && <pre>{JSON.stringify(user)}</pre>}
      {user && <p>Created user: {user.name} (id: {user.id}) (Email: {user.email})</p>}
    </div>
  );
}
