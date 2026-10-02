"use client"

import { useState } from "react"
import { User } from "@/types" 

export default function LoginPage() {

  const [loginInfo, setLoginInfo] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const usersLocalStorage = localStorage.getItem("users")
  const users: User[] = usersLocalStorage ? JSON.parse(usersLocalStorage) : []

  const findUser = users.find(u=> u.email === loginInfo)


  function click() {
    if (findUser  && findUser.password === password){
      console.log("You're logged in")
      findUser.isLoggedIn = true;
      setIsLoggedIn(true)
    }else{
      console.log("Wrong Details")
    }
  }

  return(
    <div>
      <h1>This is the login page</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>
          <label className="label">Email</label>
          <input
          className="input"
          type="text"
          value={loginInfo}
          onChange={(e) => setLoginInfo(e.target.value)}
          />
          <label className="label">Password</label>
          <input
          className="input"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={click}>Button</button>
      </fieldset>
    </div>

  );
};

