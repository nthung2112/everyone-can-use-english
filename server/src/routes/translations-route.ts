import { Hono } from "hono";
import { db } from "../db/index";
import { translationsTable, usersTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { extractUserIdFromToken } from "../utils/jwt";

const translationsRoute = new Hono();

// Get translations
translationsRoute.get("/", async (c) => {
  try {
    const { page = "1", items = "20", source_language, target_language } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      // Translation fetching logic would go here
      // For now, return a placeholder response
      return c.json({
        translations: [],
        pagination: {
          page: parseInt(page),
          items: parseInt(items),
          hasNext: false,
        },
      });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Get translations error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create translation
translationsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { text, source_language, target_language, engine } = body;

    if (!text || !source_language || !target_language) {
      return c.json({ error: "Text, source_language, and target_language are required" }, 400);
    }

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);

      // Here you would typically call a translation service
      const translatedText = `[Translated from ${source_language} to ${target_language}]: ${text}`;

      // Translation creation logic would go here
      // For now, return a placeholder response
      return c.json({
        id: crypto.randomUUID(),
        sourceText: text,
        targetText: translatedText,
        sourceLanguage: source_language,
        targetLanguage: target_language,
        engine: engine || "default",
      });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Create translation error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default translationsRoute;
