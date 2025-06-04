import { ACTIONS_ARRAY } from '@app/schema';
import { db } from '.';
import { permissionsTable, rolePermissionsTable, rolesTable, userRolesTable, usersTable } from './schema';

async function main() {
  const hashedPassword = await Bun.password.hash('superadmin', { algorithm: 'bcrypt' });

  const [superAdminUser] = await db
    .insert(usersTable)
    .values({
      email: 'admin@test.com',
      name: 'Super Admin',
      password: hashedPassword,
    })
    .returning({ id: usersTable.id });

  const [superAdminRole] = await db
    .insert(rolesTable)
    .values({
      name: 'superadmin',
    })
    .returning({ id: rolesTable.id });

  await db.insert(userRolesTable).values({
    userId: superAdminUser.id,
    roleId: superAdminRole.id,
  });

  const resources = ['user', 'task'];

  const permissions = await db
    .insert(permissionsTable)
    .values(
      resources.flatMap(resource =>
        ACTIONS_ARRAY.map(action => ({
          action,
          resource,
        }))
      )
    )
    .returning({ id: permissionsTable.id });

  await db.insert(rolePermissionsTable).values(
    permissions.map(permission => ({
      roleId: superAdminRole.id,
      permissionId: permission.id,
    }))
  );
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
