"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"



export default function RegisterPage() {

  type FieldErrors = {
    email?: string[]
    password?: string[]
    name?: string[]
  }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [differentPassword, setDifferentPassword] =  useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const router = useRouter()


  const registerSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessMessage("")
    setError("")
    setFieldErrors({})
    setDifferentPassword("")

    if (password !== confirmPassword) {
      setDifferentPassword("Password must match")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      })
      const data = await response.json()
      if (!response.ok) {
        setFieldErrors(data.fieldErrors || {})
        setError(data.error || "Registration Failed")
      }
      if (response.ok) {
        setSuccessMessage("Account Created")
        router.push("/login")
      }
    } catch {
      setError("Could not reach server")
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className="mx-auto w-full max-w-sm p-4 flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form onSubmit={registerSubmit} noValidate>
        {error && (<div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>)}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <label className="label">Enter your Name (Optional)</label>
          <input
            className="input"
            placeholder="Name(Optional)"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name && (<p className="text-error text-sm">{fieldErrors.name[0]}</p>)}
          <label className="label">Enter your Email</label>
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && (<p className="text-error text-sm">{fieldErrors.email[0]}</p>)}
          <label className="label">Enter your password</label>
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldErrors.password && (
            <p className="text-error text-sm">{fieldErrors.password[0]}</p>
          )}
          <input
            className="input"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          { differentPassword && (<span className="text-error text-sm">{differentPassword}</span>)}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create an Account"
            )}
          </button>
          {successMessage && (<p className="">{successMessage}</p>)}
        </fieldset>
      </form>
    </div>
  );
}
