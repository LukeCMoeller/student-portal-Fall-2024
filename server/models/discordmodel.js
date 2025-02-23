const Model = require('./base.js')
const objection = require('objection')
const knex = require('../configs/db.js');

class User extends Model {
    // Table name is the only required property.
    static get tableName() {
      return 'users'
    }
  
    // Each model must have a column (or a set of columns) that uniquely
    // identifies the rows. The column(s) can be specified using the `idColumn`
    // property. `idColumn` returns `id` by default and doesn't need to be
    // specified unless the model's primary key is something else.
    static get idColumn() {
      return 'id'
    }
    
    async get_users_with_discord() { //based off application routes querys
      try {
        return await knex('user_discord')
          .join('users', 'user_discord.user_id', '=', 'users.id')
          .select('user_discord.discord_id');
      } catch (err) {
        console.error('Error fetching users with Discord:', err);
      }
  }//id rn is 
    async get_student_courses(discord_id){//more complete query
      try {
        const stuff = await knex('course_students')
          .join('users', 'course_students.user_id', '=', 'users.id')
          .join('user_discord', 'users.id', '=', 'user_discord.user_id')
          .join('courses', 'course_students.course_id', '=', 'courses.id')
          //number here is testing number for discord account
          .where('user_discord.discord_id', '592454625270038547')//replace number with discord id
          .where('courses.subject', 'like', '%CIS%') 
          .select('courses.subject', 'courses.catalog');
          console.log(stuff);
         
      } catch (err) {
        console.error('Error fetching courses for Discord ID:', err);
        throw err;
      }
    }
    
}  
module.exports = User;