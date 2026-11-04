## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values
   (`DATABASE_URL`, `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`).

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

### After changing `prisma/schema.prisma`

```bash
npx prisma migrate dev --name <change_name>   # updates the database
npx prisma generate                           # updates the TypeScript client in app/generated/prisma
```

Then restart `npm run dev` (and the TS server in the editor if types look stale).


## Auth Approach

AUTHJS with Google and Github Login

OAuth

