/**
 * @swagger
 * tags:
 *   name: API
 *   description: API
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
import express from 'express'
const router = express.Router()

// Load Middleware
import token from '../middlewares/token.js'
import { dbAudit } from '../middlewares/db-audit.js'
import requestLogger from '../middlewares/request-logger.js'

// Load Routers
import usersRouter from './userRoutes.js'

// Load Token Middleware
router.use(token)

// Load DB Audit Middleware
router.use(dbAudit)

// Configure Logging (after token)
router.use(requestLogger)

router.use('/users', usersRouter)
router.use('/profile', profileRouter)
router.use('/roles', roleRouter)
router.use('/platforms', platformsRouter)
router.use('/courses', coursesRouter)
router.use('/tools', toolsRouter)
router.use('/deployments', deploymentRouter)
router.use('/activities', activitiesRouter)

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
router.get('/', function (req, res, next) {
  res.json({
    version: 1.0,
    user_id: req.user_id,
    is_admin: req.is_admin ? 1 : 0,
  })
})

export default router