"use client"

import { useState } from "react"
import { User } from "@/types" 
export default function LoginPage() {


  const [loginInfo, setLoginInfo] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  function login(loginInfo:string, password:string):boolean{
    let loginSucessful:boolean;

    return loginSucessful = true
  }


  return(
    <div>
      <h1>This is the login page</h1>
    </div>

  );
};

