
  export type newsletterStatus = "Sent" | "Draft" | "Schedule"

  export const userDatabase:User[]= []

  export interface Newsletter {
    id:number
    title:string
    content:string
    image:string
    status:newsletterStatus
    authorId:number
    createdAt:Date
    updatedAt?:Date
  }
  export interface User {
    id: number
    email: string
    password:string
    createdAt:Date
    updatedAt?:Date
    name?:string
    isLoggedIn?:boolean
  }
