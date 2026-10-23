"use client"

import { useState } from "react"

export default function LoginPage() {

  const [loginInfo, setLoginInfo] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)


  function click() {
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

