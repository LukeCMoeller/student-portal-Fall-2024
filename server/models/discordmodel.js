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
    }
    //HEEEEEEEEEEEEEY
    //HEEYEHEYEHEY
    //checked the database dirrectly and theres a TON of user_table stuff but no course_student stuff. maybe it dosnt acually exist
    async get_student_courses(discord_id){//more complete query
      try {
        const stuff = await knex('course_students') //says "relation course_students dose not exist"
          .join('users', 'course_students.user_id', '=', 'users.id')
          .join('user_discord', 'users.id', '=', 'user_discord.user_id')
          .join('courses', 'course_students.course_id', '=', 'courses.id')
          .where('user_discord.discord_id', discord_id)
          .where('courses.subject', 'like', '%CIS%') //needs to be tested to confirm
          .select('courses.catalog'); //only need this
          console.log("testing below"); //log isnt hitting
          console.log(stuff);
          console.log("testing above");
      } catch (err) {
        console.error('Error fetching courses for Discord ID:', err);
        throw err;
      }
    }
    /*
     //one that goes through every table
  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'user_discord.discord_id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: 'user_discord.discord_id',
            to: 'users.id',//? where does  discord id go here
          },
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: 'users.id',
            to: 'course_students.user_id',
          },
          to: 'course_students.user_id',
        },
        filter: (builder) => builder.select('User'),
      },
    }
  }*/
 /*
     // one that goes a single time from spot to spot
  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'user_discord.user_id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: 'user_discord.user_id',
            to: 'course_students.user_id',
          },
          to: 'course_students.user_id',
        },
        filter: (builder) => builder.select('User'),
      },
    }
  }*/
}  

module.exports = User;