## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values.
   (`DATABASE_URL`, `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`).
   (Github/Google are optional) To test the login/register use credentials

   ```bash
   npx auth secret 
   ```

   to generate AUTH_SECRET

3. Create the database tables and generate the Prisma client

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

   > Prisma 7: `migrate` no longer runs `generate` for you, so both commands are needed.

4. Seed test users and newsletters

   ```bash
   npx prisma db seed
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).


## Auth Approach

- AuthJS with Credentials, GitHub and Google 
- Bcrypt hashing
- Zod on client and server side
- proxy.ts guards dashboard/ + auth() checking every server action
- signIn refused if email belongs to another method

## Test Credentials 
- alice@example.com / Password1!
- bob@example.com / Password1!

## ENV

- Please refer to .env.example in the files

## Requirements

- Node.js 26
- PostgreSQL 15+


## Extra Features

- Multi-method auth
- External Newsletters (US-RSE, devTo)
- Usability Features

