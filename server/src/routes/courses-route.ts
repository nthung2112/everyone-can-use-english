import { Hono } from "hono";
import { db } from "../db/index";
import {
  coursesTable,
  chaptersTable,
  enrollmentsTable,
  chapterCompletionsTable,
  usersTable,
} from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { extractUserIdFromToken } from "../utils/jwt";

const coursesRoute = new Hono();

// Get courses
coursesRoute.get("/", async (c) => {
  try {
    const { language, page = "1", items = "20", query } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const whereConditions = [];
    if (language) {
      whereConditions.push(eq(coursesTable.language, language));
    }
    // TODO: Add text search for query parameter

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const courses = await db
      .select({
        id: coursesTable.id,
        title: coursesTable.title,
        description: coursesTable.description,
        language: coursesTable.language,
        level: coursesTable.level,
        category: coursesTable.category,
        imageUrl: coursesTable.imageUrl,
        price: coursesTable.price,
        currency: coursesTable.currency,
        duration: coursesTable.duration,
        lessonsCount: coursesTable.lessonsCount,
        metadata: coursesTable.metadata,
        published: coursesTable.published,
        createdAt: coursesTable.createdAt,
        updatedAt: coursesTable.updatedAt,
      })
      .from(coursesTable)
      .where(whereClause)
      .orderBy(desc(coursesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({
      courses,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: courses.length === limit,
      },
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get specific course
coursesRoute.get("/:id", async (c) => {
  try {
    const courseId = c.req.param("id");

    const course = await db
      .select({
        id: coursesTable.id,
        title: coursesTable.title,
        description: coursesTable.description,
        language: coursesTable.language,
        level: coursesTable.level,
        category: coursesTable.category,
        imageUrl: coursesTable.imageUrl,
        price: coursesTable.price,
        currency: coursesTable.currency,
        duration: coursesTable.duration,
        lessonsCount: coursesTable.lessonsCount,
        metadata: coursesTable.metadata,
        published: coursesTable.published,
        createdAt: coursesTable.createdAt,
        updatedAt: coursesTable.updatedAt,
      })
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId))
      .limit(1);

    if (course.length === 0) {
      return c.json({ error: "Course not found" }, 404);
    }

    return c.json(course[0]);
  } catch (error) {
    console.error("Get course error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get course chapters
coursesRoute.get("/:id/chapters", async (c) => {
  try {
    const courseId = c.req.param("id");
    const { page = "1", items = "20", query } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const whereConditions = [eq(chaptersTable.courseId, courseId)];
    // TODO: Add text search for query parameter

    const chapters = await db
      .select()
      .from(chaptersTable)
      .where(and(...whereConditions))
      .orderBy(chaptersTable.order)
      .limit(limit)
      .offset(offset);

    return c.json({
      chapters,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: chapters.length === limit,
      },
    });
  } catch (error) {
    console.error("Get course chapters error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get specific chapter
coursesRoute.get("/:courseId/chapters/:id", async (c) => {
  try {
    const courseId = c.req.param("courseId");
    const chapterId = c.req.param("id");

    const chapter = await db
      .select()
      .from(chaptersTable)
      .where(and(eq(chaptersTable.courseId, courseId), eq(chaptersTable.id, chapterId)))
      .limit(1);

    if (chapter.length === 0) {
      return c.json({ error: "Chapter not found" }, 404);
    }

    return c.json(chapter[0]);
  } catch (error) {
    console.error("Get chapter error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Finish chapter
coursesRoute.post("/:courseId/chapters/:id/finish", async (c) => {
  try {
    const courseId = c.req.param("courseId");
    const chapterId = parseInt(c.req.param("id"));

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);

      // Check if user is enrolled in the course
      const enrollment = await db
        .select()
        .from(enrollmentsTable)
        .where(and(eq(enrollmentsTable.courseId, courseId), eq(enrollmentsTable.userId, userId)))
        .limit(1);

      if (enrollment.length === 0) {
        return c.json({ error: "User not enrolled in this course" }, 403);
      }

      // Mark chapter as completed
      await db
        .insert(chapterCompletionsTable)
        .values({
          enrollmentId: enrollment[0].id,
          chapterId: chapterId.toString(),
        })
        .onConflictDoNothing();

      return c.json({ message: "Chapter completed successfully" });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Finish chapter error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default coursesRoute;
