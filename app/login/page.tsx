"use client"

import { useState } from "react"
import { User } from "@/types" 
import { userStorage } from "@/register"

export default function LoginPage() {

  const [loginInfo, setLoginInfo] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  


  const usersLocalStorage = localStorage.getItem("users")
  const users: User[] = usersLocalStorage ? JSON.parse(usersLocalStorage) : []

  const findUser = users.find(u=> u.email === loginInfo)




  function click() {
    if (findUser  && findUser.password === password){
      console.log("YOure logged in")
    }else{
      console.log("Wrong Deetails")
    }
  }

  return(
    <div>
      <h1>This is the login page</h1>
      <input
        type="text"
        placeholder="Enter your email"
        value={loginInfo}
        onChange={(e) => setLoginInfo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={click}>Button</button>
    </div>

  );
};

