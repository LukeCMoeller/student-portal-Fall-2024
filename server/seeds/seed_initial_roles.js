/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clear existing entries
  await knex('user_courses').del();
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
      eid: 'E101',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      refresh_token: null,
      admin: false,
      advisor: false,
      warning: false,
      updated_at: '2024-11-01 10:00:00',
      updated_by: 'system'
    },
    {
      wid: 102,
      eid: 'E102',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'janesmith@example.com',
      refresh_token: null,
      admin: false,
      advisor: false,
      warning: false,
      updated_at: '2024-11-01 11:00:00',
      updated_by: 'system'
    },
    {
      wid: 103,
      eid: 'E103',
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alicejohnson@example.com',
      refresh_token: null,
      admin: false,
      advisor: false,
      warning: false,
      updated_at: '2024-11-01 12:00:00',
      updated_by: 'system'
    },
    {
      wid: 104,
      eid: 'E104',
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@ksu.edu',
      refresh_token: null,
      admin: true,
      advisor: false,
      warning: false,
      updated_at: '2024-11-01 10:00:00',
      updated_by: 'system'
    },
  ]);

  // Assign roles to users
  await knex('user_roles').insert([
    { user_id: 1, role_id: 1 }, 
    { user_id: 2, role_id: 1 },
    { user_id: 3, role_id: 1 },
    { user_id: 4, role_id: 2 },
  ]);
};
