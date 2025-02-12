/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clear existing entries
  await knex('course_instructors').del();
  await knex('course_students').del();
  await knex('courses').del();
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
  ]);

  await knex('courses').insert([
    { class_number: 101, term: 202501, subject: 'CS', catalog: '101', name: 'Intro to CS', section: 'A', component: 'LEC', instructor: 'Dr. Brown', credit_hours: 3 },
    { class_number: 102, term: 202501, subject: 'MATH', catalog: '201', name: 'Calculus II', section: 'B', component: 'LEC', instructor: 'Dr. Green', credit_hours: 4 }
  ]);

  //Add students and instructors to courses
  const courses = await knex('courses').select('id', 'class_number');
  const courseMap = Object.fromEntries(courses.map(c => [c.class_number, c.id]));

  await knex('course_students').insert([
    { course_id: courseMap[101], user_id: userMap['jariddle'], grade: 'C', ignore_in_gpa: false, dropped: false },
    { course_id: courseMap[102], user_id: userMap['ejones'], grade: 'B+', ignore_in_gpa: false, dropped: false }
  ]);

  await knex('course_instructors').insert([
    { course_id: courseMap[101], user_id: userMap['ajohnson'] },
    { course_id: courseMap[102], user_id: userMap['ajohnson'] }
  ]);

};
