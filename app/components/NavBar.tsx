"use client"

import Link from 'next/link'
import { SignOut } from './signout-button'
import { useSession } from "next-auth/react" 


export const NavBar = () => {

  const { data: session } = useSession()
  const links = [
    { href: "/newsletters", label: "Newsletters", show: true },
    { href: "/dashboard",   label: "Dashboard",   show: !!session?.user },
    { href: "/login",       label: "Login",       show: !session?.user },
    { href: "/register",    label: "Register",    show: !session?.user },
  ].filter((l) => l.show)




  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Newsletter</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {links.map((link) => (
          <li  key={link.href}>
            <Link className="btn btn-soft btn-primary" href={link.href}>{link.label}</Link>
          </li>
        ))}
        </ul>
      </div>
      {session?.user ? (
        <div className="dropdown dropdown-end navbar-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center">
              <span className="text-lg">
                {session?.user?.name?.charAt(0).toUpperCase() || session?.user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <p>{session.user.name}</p>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow" tabIndex={-1}>
            <li>
              <span>
                {session.user.name || session.user.email}
              </span>
            </li>
            <li>
              <SignOut />
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-end">
        </div>
      )}

    </div>
  )
}

