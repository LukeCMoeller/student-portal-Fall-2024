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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
      wid: 101,
      eid: 'E101',
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

  // Insert programs
  await knex('programs').insert([
    { id: 1, name: 'Computer Science', plan: 'CS-Plan-B', subplan: 'Data Science' },
    { id: 2, name: 'Computer Science', plan: 'CS-Plan-A' },
    { id: 3, name: 'Computer Science', plan: 'CS-Plan-A' },
    { id: 4, name: 'Computer Science', plan: 'CS-Plan-A' }
  ]);

  // Assign programs to users
  await knex('user_program').insert([
    { user_id: 1, program_id: 1, graduated: false, withdrew: false, dismissed: false, program_gpa: 3.5, on_warning: false },
    { user_id: 2, program_id: 2, graduated: false, withdrew: false, dismissed: false, program_gpa: 3.8, on_warning: false },
    { user_id: 3, program_id: 3, graduated: false, withdrew: false, dismissed: false, program_gpa: 4.0, on_warning: false },
    { user_id: 4, program_id: 3, graduated: false, withdrew: false, dismissed: false, program_gpa: 4.0, on_warning: false },
  ]);
};
