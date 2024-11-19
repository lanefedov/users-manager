// Import the PrismaClient constructor
import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Define the array of users
const users = [
  { firstName: 'Лев', lastName: 'Нефедов' },
  { firstName: 'Андрей', lastName: 'Иванов' },
  { firstName: 'Дарья', lastName: 'Петрова' },
  { firstName: 'Алексей', lastName: 'Михайлов' },
  { firstName: 'Ева', lastName: null },
  { firstName: 'Кристина', lastName: 'Светлова' },
  { firstName: 'Дмитрий', lastName: 'Ведров' },
  { firstName: 'Анастасия', lastName: 'Никитина' },
  { firstName: 'Иван', lastName: 'Кириллов' },
  { firstName: 'Анатолий', lastName: null },
];

async function main() {
  console.log('Start seeding...');

  const result = await prisma.user.createMany({
    data: users,
  });

  console.log(`Inserted ${result.count} users`);
}

main()
  .then(async () => {
    console.log('Seeding finished.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
