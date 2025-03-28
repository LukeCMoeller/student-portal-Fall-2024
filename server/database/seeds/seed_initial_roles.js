/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('course_instructors').del();
  await knex('course_students').del();
  await knex('courses').del();
  await knex('professional_program_applications').del();
  await knex('user_roles').del();
  await knex('roles').del();
  await knex('user_discord').del();
  await knex('user_github').del();
  await knex('academic_status').del();
  await knex('users').del();

  // Insert roles
  await knex('roles').insert([
    { id: 1, name: 'api' },
    { id: 2, name: 'admin' },
    { id: 3, name: 'reviewer'},
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
      profile_updated: true,
      updated_at: '2024-11-01 10:00:00',
      updated_by: 'system'
    },
    {
      wid: 105,
      eid: 'lcmoeller',
      first_name: 'luke',
      last_name: 'moeller',
      email: 'lcmoeller@ksu.edu',
      refresh_token: null,
      profile_updated: true,
      updated_at: '2025-2-26 10:00:00',
      updated_by: 'system'
    },
    {
      wid: 106,
      eid: 'reviewer',
      first_name: 'reviewer',
      last_name: 'reviewer',
      email: 'reviewer@ksu.edu',
      refresh_token: null,
      profile_updated: true,
      updated_at: '2024-11-01 10:00:00',
      updated_by: 'system'
    },
    {
      wid: 107,
      eid: 'struggle',
      first_name: 'struggle',
      last_name: 'struggle',
      email: 'struggle@ksu.edu',
      refresh_token: null,
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
    { user_id: userMap['reviewer'], role_id: roleMap['reviewer'] },
    { user_id: userMap['ejones'], role_id: roleMap['api'] },
    { user_id: userMap['ajohnson'], role_id: roleMap['api'] },
    { user_id: userMap['admin'], role_id: roleMap['admin'] },
    { user_id: userMap['lcmoeller'], role_id: roleMap['api'] },
  ]);

  await knex('academic_status').insert([
    { user_id: userMap['struggle'], gpa: 1.62, warning: true, probation: true},
    { user_id: userMap['jariddle'], gpa: 3.42},
  ]);

  await knex('professional_program_applications').insert([
    {
      user_id: userMap['jariddle'],
      semester: 'Fall 2024',
      status: 'Pending',
      notes: 'Waiting for review',
      waiver: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      created_by: 'admin',
      updated_by: 'admin'
    },
    {
      user_id: userMap['ejones'],
      semester: 'Spring 2025',
      status: 'Pending',
      notes: 'Waiting for review',
      waiver: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      created_by: 'admin',
      updated_by: 'admin'
    }
  ]);
  await knex('user_discord').insert([
    { user_id: userMap['lcmoeller'], discord_id: '592454625270038547', username: '.pannmann' },
    { user_id: userMap['jariddle'], discord_id: '1313234532412952578', username: 'jariddle2024' }
  ]);
  
  await knex('courses').insert([
    { class_number: 101, term: 202501, subject: 'CS', catalog: '101', name: 'Intro to CS', section: 'A', component: 'LEC', credit_hours: 3 },
    { class_number: 102, term: 202501, subject: 'MATH', catalog: '201', name: 'Calculus II', section: 'B', component: 'LEC',  credit_hours: 4 },
    { class_number: 115, term: 202501, subject: 'CIS', catalog: '115', name: 'Intro to Programming', section: 'B', component: 'LEC',  credit_hours: 4 },
    { class_number: 200, term: 202501, subject: 'CIS', catalog: '200', name: 'Programming fundementals', section: 'A', component: 'LEC',  credit_hours: 4 },
    { class_number: 300, term: 202501, subject: 'CIS', catalog: '300', name: 'Data and Program Structures', section: 'A', component: 'LEC',  credit_hours: 3 }
  ]);

  //Add students and instructors to courses
  const courses = await knex('courses').select('id', 'class_number');
  const courseMap = Object.fromEntries(courses.map(c => [c.class_number, c.id]));

  await knex('course_students').insert([
    { course_id: courseMap[101], user_id: userMap['jariddle'], grade: 'C', ignore_in_gpa: false, dropped: false },
    { course_id: courseMap[102], user_id: userMap['ejones'], grade: 'B+', ignore_in_gpa: false, dropped: false },
    { course_id: courseMap[115], user_id: userMap['lcmoeller'], grade: 'F', ignore_in_gpa: false, dropped: false },
    {course_id: courseMap[115], user_id: userMap['jariddle'], grade: 'A', ignore_in_gpa: false, dropped: false },
    {course_id: courseMap[200], user_id: userMap['jariddle'], grade: 'A-', ignore_in_gpa: false, dropped: false },
    {course_id: courseMap[300], user_id: userMap['ejones'], grade: 'A', ignore_in_gpa: false, dropped: false }
  ]);

  await knex('course_instructors').insert([
    { course_id: courseMap[101], user_id: userMap['ajohnson'] },
    { course_id: courseMap[102], user_id: userMap['ajohnson'] },
    { course_id: courseMap[115], user_id: userMap['ajohnson'] }
  ]);

};