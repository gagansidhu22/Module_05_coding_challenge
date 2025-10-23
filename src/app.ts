// src/app.ts
import express, { Express, Request, Response } from "express";
import moderationRoutes from "../src/v1/routes/moderationRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "../src/config/swaggeroptions";

const app: Express = express();
app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Mount moderation routes on /api/v1/moderation
 */
app.use("/api/v1/moderation", moderationRoutes);

/**
 * Default error handler for unmatched routes
 */
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
