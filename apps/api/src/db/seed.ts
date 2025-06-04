import { db } from '.';
import { usersTable } from './schema';

async function main() {
  console.log('Seeding user...');
  const hashedPassword = await Bun.password.hash('superadmin', { algorithm: 'bcrypt' });
  await db.insert(usersTable).values({
    email: 'admin@test.com',
    name: 'Super Admin',
    password: hashedPassword,
  });
}

const startTime = Date.now();

main()
  .then(() => {
    const endTime = Date.now();
    console.log('✅ Seeding completed successfully.');
    console.log(`Execution time: ${endTime - startTime}ms`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seeding failed.');
    console.error(error);
    const endTime = Date.now();
    console.error(`Execution time: ${endTime - startTime}ms`);
    process.exit(1);
  });
