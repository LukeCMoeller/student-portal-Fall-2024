const Model = require('./base.js')
const objection = require('objection')
const knex = require('../configs/db.js');

class Discord extends Model {
    // Table name is the only required property.
    static get tableName() {
      return 'user_discord'
    }
  
    // Each model must have a column (or a set of columns) that uniquely
    // identifies the rows. The column(s) can be specified using the `idColumn`
    // property. `idColumn` returns `id` by default and doesn't need to be
    // specified unless the model's primary key is something else.
    static get idColumn() {
      return 'user_id'
    }
    
    async get_users_with_discord() { //based off application routes querys
      try {
        return await knex('user_discord')
          .join('users', 'user_discord.user_id', '=', 'users.id')
          .select('user_discord.discord_id');
      } catch (err) {
        console.error('Error fetching users with Discord:', err);
      }
    }
    async get_student_courses(user_id){
      try {
        return await knex('users')
        .join('user_discord', 'users.id', 'user_discord.user_id')
        .join('course_students', 'users.id', 'course_students.user_id')
        .join('courses', 'course_students.course_id', 'courses.id')
        .where('users.id', user_id)
        .where('courses.subject', 'like', '%CIS%')
        .select('users.id', 'courses.catalog' );
      } catch (err) {
        console.error('Error fetching courses for Discord ID:', err);
        throw err;
      }
    }
}  

module.exports = Discord;