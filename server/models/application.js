const Model = require('./base.js')
const logger = require('../configs/logger.js')
const objection = require('objection')

//Related Roles
const User = require('./user.js')

//Model class for submitted professional program applications (PPAs)
class Application extends Model {
    //The table in the migration this Model refers to
    static get tableName() {
        return 'professional-program-application'
    }

    //Default, defined for clarity
    static get idColumn() {
        return 'id'
      }

    //Method to find application
    static async find(user_id) {
        let application = await Application.query().where('user_id', user_id).limit(1)

        if(application.length === 0) {
            return null
        }
        //If found, return application
        return application[0]
    }

    static async create(user_id, application) {
        application = [
            await Application.query().insert({
                semester: application.semester,
                status: application.status, //Might always be pending or something like that, if this is immediately after submission
                notes: application.notes,
                waiver: application.waiver
                //We will need to do a separate related query afterwards for the user information
            })
        ]
        //This should connect the application to the user that submitted it
        //Might have to find the user in this method somehow, rather than passing in the ID
        await Application.relatedQuery('user')
            .for(application[0].id)
            .relate(user_id)

        return application[0]
    }

    static async getApplicationCourses(user_id) {

    }

    static get relationMappings() {
        return {
          roles: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'users.id',
              to: 'professional_program_applications.user_id',
            },
            filter: (builder) => builder.select('id'),
          },
        }
      }
}

module.exports = Application