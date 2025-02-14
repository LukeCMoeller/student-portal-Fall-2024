const Model = require('./base.js')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const logger = require('../configs/logger.js')
const objection = require('objection')

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

    //Method to insert or find applications
    //Even though they'd do similar things, might want to split this into two different methods, because different use cases
    static async findOrCreate(user_id, semester, status, notes, waiver) {
        let application = await Application.query().where('user_id', user_id).limit(1)

        if(application.length === 0) {
            //Application not found, need to create a new one to submit
            application = [
                await Application.query().insert({
                    semester: semester,
                    status: status, //Might always be pending or something like that, if this is immediately after submission
                    notes: notes,
                    waiver: waiver
                    //We will need to do a separate related query afterwards for the user information
                })
            ]
            //This should connect the application to the user that submitted it
            //Might have to find the user in this method somehow, rather than passing in the ID
            await Application.relatedQuery('user')
                .for(application[0].id)
                .relate(user_id)
            //Related query will go out here
        }
        //After finding or creating, return the application
        return application[0]
    }
}