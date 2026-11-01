import * as z from "zod"

//One lowercase
//One uppercase
//One Digit
//One special character
//At least 8 char long

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;


export const registrationSchema = z.object({
  email: z.string()
    .trim()
    .email("Please enter a valid email"),

  password: z.
    string()
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password mus have maximun 20 characters")
    .regex(passwordRegex, "One lowercase, One uppercase, One Digit, One special character, At least 8 char long"),

  name: z.string()
    .trim()
    .max(20, "Name must be max 20 characters")
    .optional()
});
 
export const signInSchema = z.object({
  email:z.string()
  .min(1, "Email is required")
  .email("Invalid email"),
  password:z.string()
   .min(1, "Password is required")
})

