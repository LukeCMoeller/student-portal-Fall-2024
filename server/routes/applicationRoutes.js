/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: API to move information around with the applications. Mix of user and admin level
 *   base-file-route: api/v1/protected/applications/
 */

const express = require('express');
const router = express.Router();
const reviewerOnly = require('../middleware/reviewer-required.js')
const Application = require('../models/application.js');
const { knex } = require('../models/base.js');
const User = require('../models/user.js');

/*
 * API routes for handling professional program applications
 * Base api route: "api/applications/"
 */

//Route to get the list of applications
router.get('/', reviewerOnly, async (req, res) => {
  const knex = req.app.get('knex')
  try {
    const applications = await knex('professional_program_applications')
      .join('users', 'professional_program_applications.user_id', '=', 'users.id')
      .select(
        'professional_program_applications.id',
        'professional_program_applications.user_id',
        'professional_program_applications.semester',
        'professional_program_applications.status',
        'professional_program_applications.notes',
        'professional_program_applications.waiver',
        'professional_program_applications.created_by',
        'professional_program_applications.updated_by',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.eid',
        'users.wid' 
      );
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).send('Server error');
  }
});

router.get('/self', async (req, res) => {
  //let applications = await Application.query().where('user_id', req.user_id).limit(1)
  let applications = []
  //let courses = await User.getApplicationCourses(req.user_id)
  if(applications.length === 0) {
    //No submitted application found, but still need to return the course information
    //Need to just return some dummy data for now
    res.json({application: undefined, course_grades: {cis_115:'A', cis_116:'B', cis_200:'C', cis_300:'D', cis_301:'A', ece_241:'F', math_220:'B', math_221:'D'}})
  } else {
    //res.json(applications[0], courses)
    res.json({application: applications[0], course_grades: {cis_115:'A', cis_116:'B', cis_200:'C', cis_300:'D', cis_301:'A', ece_241:'F', math_220:'B', math_221:'D'}})
  }
})

//Route for a user to submit their application
router.post('/submit', async (req, res) => {
  try {
    Application.create(req.body.user_id, req.body.application)
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).send('Server error');
  }
  
})

module.exports = router;
