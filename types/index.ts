
  export type newsletterStatus = "Sent" | "Draft" | "Schedule"

  export const userDatabase:User[]= []

  const isAuthenticated:boolean;

  export interface User {
    id: number
    email: string
    password:string
    createdAt:Date
    updatedAt?:Date
    name?: string
  }
