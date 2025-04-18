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

    static isPrerequisiteCourse(course) {
        return prerequisiteCourses.some(prereq =>
            prereq.class_number === course.class_number && prereq.subject === course.subject
        );
    }

    static addCourseToResults(course, combinedCourses) {
        const existingCourse = combinedCourses.find(c =>
            c.class_number === course.class_number && c.subject === course.subject
        );

        if (!existingCourse) {
            combinedCourses.push({
                class_number: course.class_number,
                subject: course.subject,
                grade: course.grade || "N/A",  // Default to "N/A" if no grade exists
                course_status: course.course_status || (course.grade ? "In Progress" : "Not Started"),
                waiver: course.waiver || false, // Default waiver
            });
        } else {
            // Only update the waiver field if course already exists
            existingCourse.waiver = course.waiver || existingCourse.waiver || false;
        }
    }

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
            user_id = parseInt(user_id, 10);
            const results = [];

            //Pull all real enrolled courses.
            const enrolledCourses = await this.query()
                .join('course_students', 'courses.id', 'course_students.course_id')
                .where('course_students.user_id', user_id)
                .select(
                    'courses.class_number',
                    'courses.subject',
                    'course_students.grade'
                );
            //Add to the results
            enrolledCourses.forEach(course => {
                if (this.isPrerequisiteCourse(course)) {
                    this.addCourseToResults(course, results);
                }
            });

            //Pull all application course data
            const appCourses = await ApplicationCourse.get(user_id)
            appCourses.forEach(course => {
                if (this.isPrerequisiteCourse(course)) {
                    this.addCourseToResults(course, results);
                }
            });

            this.addMissingPrerequisiteCourses(results);

            ApplicationCourse.update(user_id, results);

            return results;
            
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
