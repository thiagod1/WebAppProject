import "dotenv/config";
import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/auth";

const image = (id:string) => 
  `https://images.unsplash.com/photo-${id}?w=1200`

 async function main (){
    const password =  await hashPassword("Password1!")


    const alice = await prisma.user.upsert({
      where: { email: "alice@example.com"},
      update: { password },
      create: { email: "alice@example.com", name: "Alice", password}
    })
    const bob = await prisma.user.upsert({
      where: { email: "bob@example.com"},
      update: { password },
      create: { email: "bob@example.com", name: "bob", password}
    })


    await prisma.newsletter.deleteMany({where: {authorId: {in: [alice.id, bob.id]}}})

    await prisma.newsletter.createMany({
      data: [{
        title: "Test 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: image("1504711434969-e33886168f5c"), 
        status: "SENT",
        authorId:  alice.id },
      {
        title: "Test 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: image("1486312338219-ce68d2c6f44d"), 
        status: "SENT",
        authorId:  alice.id },
      {
        title: "Test 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: image("1499750310107-5fef28a66643"), 
        status: "SCHEDULE",
        authorId:  alice.id },
      {
        title: "Test 4",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: image("1517694712202-14dd9538aa97"), 
        status: "DRAFT",
        authorId:  alice.id },
      {
        title: "Test 5",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: image("1495020689067-958852a7765e"), 
        status: "SENT",
        authorId:  bob.id },
      {
        title: "Test 6",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: image("1461749280684-dccba630e2f6"), 
        status: "SENT",
        authorId:  bob.id },
      ],
    })
    console.log("Login: alice@example.com / bob@example.com, password: Password1!")
 }

 main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
