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

    //Method to insert applications, will need to figure out what information gets passed here to then send to the database
    static async findOrCreate(user_id) {
        let application = await Application.query().where('user_id', user_id).limit(1)

        if(application.length === 0) {
            //Application not found, need to create a new one to submit
            application = [
                await Application.query().insert({
                    //This is where we put in all of the fields
                    //We will need to do a separate related query afterwards for the user information
                })
            ]
            //Related query will go out here
        }
        //After finding or creating, return the application
        return application[0]
    }
}