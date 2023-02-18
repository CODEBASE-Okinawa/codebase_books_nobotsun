import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs'

async function main() {
  const hashedPassword = await bcrypt.hash('11111111', 10)
  for (let i = 1; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `user${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
        admin: false,
      },
    })
    console.debug(user)
  }
  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      admin: true,
    },
  })
  console.debug(admin)

  const bookNames = [
    'プログラミング言語Ruby',
    'プロを目指す人のためのRuby入門',
    'プロを目指す人のためのTypeScript入門',
    'ゼロからわかるRuby超入門',
    'Webを支える技術',
  ]
  for (const bookName of bookNames) {
    const book = await prisma.book.create({
      data: {
        title: bookName,
        imageUrl: '/images/no-image.jpg',
      },
    })
    console.debug(book)
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
