"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { signInSchema } from "../lib/validation"
import * as z from "zod"


type FieldErrors = {
  email?: string[],
  password?: string[],
}

export default function LoginPage() {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const router = useRouter()

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setFieldErrors({})


    const result = signInSchema.safeParse({email, password})
    if(!result.success){
      setFieldErrors(z.flattenError(result.error).fieldErrors)
      setIsSubmitting(false)
      return
    }

    try{
      const response = await signIn("credentials",{
        email, 
        password,
        redirect:false,
      })

      if(response?.error){
        setError("Invalid credentials")
        return
      }

      router.refresh()
      router.push("/")

    }catch(err){
      setError("Something happenedd") 
      console.log(err)
    }finally{
      setIsSubmitting(false)
    }
  }
  return(
    <>
      <form onSubmit={handleLogin} className="mt-4" noValidate>
        {" "}
        {error && (<div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>)}
        <div className="form-control">
          <label className= "label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
           />
          {fieldErrors.email && (<p className="text-error text-sm">{fieldErrors.email[0]}</p>)}
        </div>
        <div className="form-control">
          <label className= "label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="*********"
            className="input input-bordered w-full"
            value={password}
            onChange={(E)=> setPassword(E.target.value)}
           />
          {fieldErrors.password&& (<p className="text-error text-sm">{fieldErrors.password[0]}</p>)}
        </div>
        <div className="form-control mt-6">
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={isSubmitting}
            >
            {isSubmitting ? (<span className="loading loading-spinner loading-sm"></span>
              ): ( 
                "Sign In"
              )}
          </button>
        </div>
      </form>

      <div className="divider">OR</div>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="link link-primary">
          Sign Up
         </Link>
      </p>
    </>
  );
};



