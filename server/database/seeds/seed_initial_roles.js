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

  await knex('courses').insert([
    { class_number: 101, term: 202501, subject: 'CS', catalog: '101', name: 'Intro to CS', section: 'A', component: 'LEC', credit_hours: 3 },
    { class_number: 102, term: 202501, subject: 'MATH', catalog: '201', name: 'Calculus II', section: 'B', component: 'LEC',  credit_hours: 4 }
  ]);

  const fs = require('fs');
  const csv = require('csv-parser');
  const courseResults = [];
  const userResults = [];
  const uniqueCourses = [];
  const seen = new Set();

  await new Promise((resolve, reject) => {
    fs.createReadStream('../database/data/courses.csv')
      .pipe(csv({skipLines: 1}))
      .on('data', (row) => {

        //Skip invalid rows
        if (!row['Class Nbr'] || !row['Subject'] || !row['Catalog'] || !row['KSU Class Descr'] || !row['Component'] || !row['Term']) {
          return;
        }
        courseResults.push({
          class_number: parseInt(row['Class Nbr'], 10),
          term: parseInt(row['Term'].trim(), 10),
          subject: row['Subject'].trim(),
          catalog: row['Catalog'].trim(),
          name: row['KSU Class Descr'].trim(),
          section: 'A',
          component: row['Component'].trim(),
          credit_hours: -1,
        });
      })
      .on('end', async () => {
        //Logic for adding unique courses to the courses table
        courseResults.forEach(row => {
          if (!seen.has(row.class_number)) {
            uniqueCourses.push(row);
            seen.add(row.class_number);
          }
        });
        //Inserting into the courses table in batches
        const batchSize = 1000;
        for (let i = 0; i < uniqueCourses.length; i += batchSize) {
          const batch = uniqueCourses.slice(i, i + batchSize);
          try {
            await knex('courses').insert(batch);
            console.log(`Inserted ${batch.length} rows successfully`);
          } catch (error) {
            console.error('Error inserting batch:', error);
          }
        }
      })
      .on('error', (error) => reject(error));
  });
  

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
