import { Hono } from "hono";
import { db } from "../db/index";
import { translationsTable } from "../db/schema";
import { eq, desc } from "drizzle-orm";

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

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // let whereConditions = [eq(translationsTable.userId, userId)];
    // if (source_language) {
    //   whereConditions.push(eq(translationsTable.sourceLanguage, source_language));
    // }
    // if (target_language) {
    //   whereConditions.push(eq(translationsTable.targetLanguage, target_language));
    // }
    //
    // const translations = await db
    //   .select()
    //   .from(translationsTable)
    //   .where(and(...whereConditions))
    //   .orderBy(desc(translationsTable.createdAt))
    //   .limit(limit)
    //   .offset(offset);
    //
    // return c.json({
    //   translations,
    //   pagination: {
    //     page: parseInt(page),
    //     items: parseInt(items),
    //     hasNext: translations.length === limit,
    //   },
    // });
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

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    //
    // // Here you would typically call a translation service
    // const translatedText = `[Translated from ${source_language} to ${target_language}]: ${text}`;
    //
    // const newTranslation = await db
    //   .insert(translationsTable)
    //   .values({
    //     id: crypto.randomUUID(),
    //     userId,
    //     sourceText: text,
    //     targetText: translatedText,
    //     sourceLanguage: source_language,
    //     targetLanguage: target_language,
    //     engine: engine || "auto",
    //   })
    //   .returning();
    //
    // return c.json(newTranslation[0]);
  } catch (error) {
    console.error("Create translation error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default translationsRoute;
