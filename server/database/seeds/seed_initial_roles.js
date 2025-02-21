/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clear existing entries
  await knex('course_students').del();
  await knex('course_instructors').del();
  await knex('professional_program_applications').del();
  await knex('user_roles').del();
  await knex('roles').del();
  await knex('user_program').del();
  await knex('programs').del();
  await knex('users').del();

  // Insert roles
  await knex('roles').insert([
    { id: 1, name: 'api' },
    { id: 2, name: 'admin' }
  ]);

  // Insert users
  await knex('users').insert([
    {
      wid: 101,
      eid: 'jariddle',
      first_name: 'Josh',
      last_name: 'Riddle',
      email: 'jariddle@ksu.edu',
      refresh_token: null,
      warning: false,
      profile_updated: true,
      updated_at: '2024-11-01 10:00:00',
      updated_by: 'system'
    },
    {
      wid: 102,
      eid: 'ejones',
      first_name: 'Ethan',
      last_name: 'Jones',
      email: 'ejones77@ksu.edu',
      refresh_token: null,
      warning: false,
      profile_updated: true,
      updated_at: '2024-11-01 11:00:00',
      updated_by: 'system'
    },
    {
      wid: 103,
      eid: 'ajohnson',
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alicejohnson@ksu.edu',
      refresh_token: null,
      warning: false,
      profile_updated: true,
      updated_at: '2024-11-01 12:00:00',
      updated_by: 'system'
    },
    {
      wid: 104,
      eid: 'admin',
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@ksu.edu',
      refresh_token: null,
      warning: false,
      profile_updated: true,
      updated_at: '2024-11-01 10:00:00',
      updated_by: 'system'
    },
  ]);

  // Assign roles to users
  const users = await knex('users').select('id', 'eid');
  const roles = await knex('roles').select('id', 'name');

  const userMap = Object.fromEntries(users.map(u => [u.eid, u.id]));
  const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));
  await knex('user_roles').insert([
    { user_id: userMap['jariddle'], role_id: roleMap['api'] },
    { user_id: userMap['ejones'], role_id: roleMap['api'] },
    { user_id: userMap['ajohnson'], role_id: roleMap['api'] },
    { user_id: userMap['admin'], role_id: roleMap['admin'] },
  ]).catch(console.error);
};
