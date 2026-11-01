import { auth } from "@/auth"


export const proxy = auth((req)=>{

  //if user logged out redirect to login
  if(!req.auth && req.nextUrl.pathname.startsWith("/dashboard")){
    const loginUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(loginUrl)
  }

  // if user logged in, redirect to dashbaord
  if(req.auth && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")){
    const dashboardUrl = new URL ("/dashboard", req.nextUrl.origin)
    return Response.redirect(dashboardUrl)
  }


  // Not necessarry, just here to tell it lets traffic through 
  if(req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/newsletters") return


})


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
