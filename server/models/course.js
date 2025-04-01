const logger = require('../configs/logger.js');
const { Model } = require('objection');
const CourseStudent = require('./courseStudent');
const CourseInstructor = require('./courseInstructor');
const ApplicationCourse = require('./applicationCourse');

//courses need to enter the professional program
const prerequisiteCourses = require('../configs/prerequisiteCourses');

class Course extends Model {
    static get tableName() {
        return 'courses';
    }

    static get idColumn() {
        return 'id';
    }

    static async getAllStudentCourses(id) {
        try {
            const courses = await this.query()
                .join('course_students', 'courses.id', 'course_students.course_id')
                .where('course_students.user_id', id)
                .select(
                    'courses.id',
                    'courses.class_number',
                    'courses.term',
                    'courses.subject',
                    'courses.catalog',
                    'courses.name',
                    'courses.section',
                    'courses.component',
                    'courses.credit_hours'
                );

            return courses;
        } catch (err) {
            logger.error('Error fetching user courses:', err);
            throw err;
        }
    }

    // Helper to check if a course is part of the prerequisite courses
    static isPrerequisiteCourse(course) {
        return prerequisiteCourses.some(prereq =>
            prereq.class_number === course.class_number && prereq.subject === course.subject
        );
    }

    // Helper to add a course to the results
    static addCourseToResults(course, combinedCourses) {
        const existingCourse = combinedCourses.find(c =>
            c.class_number === course.class_number && c.subject === course.subject
        );

        if (!existingCourse) {
            combinedCourses.push({
                class_number: course.class_number,
                subject: course.subject,
                grade: course.grade || "N/A",  // Default to "N/A" if no grade exists
                course_status: course.course_status || "Not Started", // Default status
                waiver: course.waiver || false, // Default waiver
            });
        }
    }

    // Helper to fetch additional courses from application_courses table
    static async fetchAdditionalCourses(user_id, combinedCourses) {
        return ApplicationCourse.query()
            .where('user_id', user_id)
            .whereNotIn('class_number', combinedCourses.map(course => course.class_number)) // Exclude courses already in combinedCourses
            .select('class_number', 'subject', 'course_status', 'waiver');
    }

    // Helper to add missing prerequisite courses to the results
    static addMissingPrerequisiteCourses(combinedCourses) {
        for (const prereq of prerequisiteCourses) {
            const match = combinedCourses.find(c =>
                c.class_number === prereq.class_number &&
                c.subject === prereq.subject
            );

            if (!match) {
                // If the course is not found in the combined results, insert as a default
                combinedCourses.push({
                    class_number: prereq.class_number,
                    subject: prereq.subject,
                    grade: "N/A", // Default to "N/A" grade
                    course_status: "Not Started", // Default status
                    waiver: false, // Default waiver value
                });
            }
        }
    }

    // Main function to get application courses
    static async getApplicationCourses(user_id) {
        try {
            // Query for courses the user is enrolled in from course_students and their status from application_courses if they exist
            const foundCourses = await this.query()
                .join('course_students', 'courses.id', 'course_students.course_id')
                .leftJoin('application_courses', function () {
                    this.on('courses.class_number', '=', 'application_courses.class_number')
                        .andOn('courses.subject', '=', 'application_courses.subject')
                        .andOn('application_courses.user_id', '=', user_id);
                })
                .where('course_students.user_id', user_id)
                .select(
                    'courses.class_number',
                    'courses.subject',
                    'course_students.grade',
                    'application_courses.course_status',
                    'application_courses.waiver'
                );

            // Combine the found courses from both course_students and application_courses
            const combinedCourses = [];

            // Add courses from foundCourses (course_students + application_courses) to the result
            foundCourses.forEach(course => {
                // Call isPrerequisiteCourse inside getApplicationCourses before adding to the result
                if (this.isPrerequisiteCourse(course)) {
                    this.addCourseToResults(course, combinedCourses);
                }
            });

            // Fetch and add additional courses from application_courses
            const additionalCourses = await this.fetchAdditionalCourses(user_id, combinedCourses);
            additionalCourses.forEach(course => {
                // Call isPrerequisiteCourse inside getApplicationCourses before adding to the result
                if (this.isPrerequisiteCourse(course)) {
                    this.addCourseToResults(course, combinedCourses);
                }
            });

            // Add any missing prerequisite courses to the results
            this.addMissingPrerequisiteCourses(combinedCourses);

            return combinedCourses;
        } catch (err) {
            logger.error('Error fetching application courses:', err);
            throw err;
        }
    }


    static get relationMappings() {
        return {
            course_students: {
                relation: Model.HasManyRelation,
                modelClass: CourseStudent,
                join: {
                    from: 'courses.id',
                    to: 'course_students.course_id'
                }
            },

            course_instructors: {
                relation: Model.HasManyRelation,
                modelClass: CourseInstructor,
                join: {
                    from: 'courses.id',
                    to: 'course_instructors.course_id'
                }
            },
        };
    }
}

module.exports = Course;
