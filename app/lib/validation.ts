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

export const newsletterSchema = z.object({
  title:   z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  image:   z.url({
    protocol: /^https$/,
    hostname: /^images\.unsplash\.com$/,
    error: "Use an Unsplash URL (https://images.unsplash.com/...)"}),
  status:  z.enum(["DRAFT", "SCHEDULE", "SENT"])
})


export const devToSchema = z.array(z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  url: z.url({ protocol: /^https$/ }),
  cover_image: z.url({ protocol: /^https$/ }).nullable(),
  published_at: z.string(),
  user: z.object({ name: z.string() }),
}))

export const rseSchema = z.array(z.object({
  title: z.string(),
  published: z.string(),
  description: z.string(),
  url: z.url({ protocol: /^https$/ }),
}))
