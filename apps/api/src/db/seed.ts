import { db } from '.';
import { usersTable } from './schema';

async function main() {
  // USERS SEED
  console.log('seeding users...');
  const hashedPassword = await Bun.password.hash('superadmin', { algorithm: 'bcrypt' });
  await db.insert(usersTable).values({
    name: 'Super Admin',
    email: 'superadmin@test.com',
    password: hashedPassword,
  });
}

const startTime = Date.now();

main()
  .then(() => {
    const endTime = Date.now();
    console.log(`Execution time: ${endTime - startTime}ms`);
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    const endTime = Date.now();
    console.error(`Execution time: ${endTime - startTime}ms`);
    process.exit(1);
  });
