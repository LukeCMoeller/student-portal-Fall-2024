const Model = require('./base.js')
const objection = require('objection')


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
    
    async get_users_with_discord() {//incomplete query
        const discord_users = await this.$query()
        return discord_users
    }
    async get_student_courses(name){//incomplete query
        const all_courses = await this.$quary()
        return all_courses
    }
    
}  