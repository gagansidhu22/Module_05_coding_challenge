// src/api/v1/routes/moderationRoutes.ts
import { Router } from "express";
import {
  moderatePost,
  flagUser,
  getPostById,
  getUserProfile,
  getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @openapi
 * /post/{id}:
 *   get:
 *     tags:
 *       - Moderation
 *     summary: Retrieve a post by ID
 *     description: Returns a post object by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Numeric or string ID of the post to retrieve.
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/post/:id", getPostById);

/**
 * @openapi
 * /post/{id}/moderate:
 *   post:
 *     tags:
 *       - Moderation
 *     summary: Moderate a post by ID
 *     description: Apply moderation action to a post (flag/hide/remove).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to moderate.
 *     requestBody:
 *       description: Moderation options (optional)
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 example: "flag"
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModerateResponse'
 *       400:
 *         description: Bad request (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @openapi
 * /user/{id}/profile:
 *   get:
 *     tags:
 *       - Moderation
 *     summary: Retrieve user profile by ID
 *     description: Get public profile information for a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @openapi
 * /user/{id}/flag:
 *   post:
 *     tags:
 *       - Moderation
 *     summary: Flag a user by ID
 *     description: Flag a user account with a reason for moderator review.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to flag.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlagUserRequest'
 *     responses:
 *       200:
 *         description: User flagged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 reason:
 *                   type: string
 *                 flaggedAt:
 *                   type: string
 *       400:
 *         description: Bad request (missing reason)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/user/:id/flag", flagUser);

/**
 * @openapi
 * /content/flags/stats:
 *   get:
 *     tags:
 *       - Moderation
 *     summary: Retrieve flagged content statistics
 *     description: Returns aggregated statistics about flagged content.
 *     responses:
 *       200:
 *         description: Flagged content statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlagStats'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
