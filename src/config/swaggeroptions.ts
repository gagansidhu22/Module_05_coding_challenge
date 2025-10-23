// src/config/swaggerOptions.ts
import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Content Moderation Service API",
      version: "1.0.0",
      description: "API documentation for moderation endpoints (v1)",
      contact: {
        name: "Dev Team",
        email: "devteam@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server (v1)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter a valid JWT token to access secured endpoints",
        },
      },
      schemas: {
        Post: {
          type: "object",
          properties: {
            id: { type: "string", example: "123" },
            content: { type: "string", example: "Sample post content here..." },
            author: { type: "string", example: "authorId" },
            isFlagged: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time", example: "2023-10-01T12:34:56Z" },
            updatedAt: { type: "string", format: "date-time", example: "2023-10-02T08:00:00Z" },
          },
        },
        UserProfile: {
          type: "object",
          properties: {
            id: { type: "string", example: "u123" },
            username: { type: "string", example: "sampleUser123" },
            bio: { type: "string", example: "This is a sample bio for the user profile." },
            isFlagged: { type: "boolean", example: false },
            joinedAt: { type: "string", format: "date-time", example: "2023-01-15T09:00:00Z" },
            postsCount: { type: "integer", example: 45 },
          },
        },
        FlagStats: {
          type: "object",
          properties: {
            totalFlaggedPosts: { type: "integer", example: 120 },
            totalFlaggedUsers: { type: "integer", example: 15 },
            mostCommonFlagReason: { type: "string", example: "Spam" },
            flaggedContentByCategory: {
              type: "object",
              additionalProperties: { type: "integer" },
              example: { spam: 75, hateSpeech: 30, inappropriateContent: 15 },
            },
          },
        },
        ModerateResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "123" },
            status: { type: "string", example: "Moderated" },
            actionTaken: { type: "string", example: "Content flagged and hidden" },
            moderatedAt: { type: "string", format: "date-time", example: "2023-10-07T12:00:00Z" },
          },
        },
        FlagUserRequest: {
          type: "object",
          properties: {
            reason: { type: "string", example: "Spam" },
          },
          required: ["reason"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Not Found" },
            details: { type: "string", example: "More context about the error" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/api/v1/routes/*.ts"], // JSDoc comments are read from route files
};
