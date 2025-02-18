/**
 * @swagger
 * tags:
 *   name: protected
 *   description: Route containing sub routes that require users to be logged in
 * components:
 *   responses:
 *     UpdateError:
 *       description: error accepting submitted data
 *     Success:
 *       description: success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */
// Load Libraries
const express = require('express')
const router = express.Router()

// Load Middleware
const token = require('../middleware/token.js')
const requestLogger = require('../middleware/request-logger.js')

// Load Routers
const usersRouter = require('./userRoutes.js')
const profileRouter = require('./profileRoutes.js')
const discordRouter = require('./discordRoutes.js')
const githubRouter = require('./githubRoutes.js')
const applicationsRouter = require('./applicationRoutes.js')

router.use(token)

router.use(requestLogger)

router.use('/users', usersRouter)
router.use('/profile', profileRouter)
router.use('/discord', discordRouter)
router.use('/github', githubRouter)
router.use('/applications', applicationsRouter)

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: list API version and user info
 *     tags: [API]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: API version and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: number
 *                   format: float
 *                 user_id:
 *                   type: integer
 *                 is_admin:
 *                   type: integer
 *             example:
 *               version: 1.0
 *               user_id: 1
 *               is_admin: 1
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

module.exports = router