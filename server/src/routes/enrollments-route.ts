import { Hono } from "hono";
import { db } from "../db/index";
import { enrollmentsTable, coursesTable, usersTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";

const enrollmentsRoute = new Hono();

// Get user enrollments
enrollmentsRoute.get("/", async (c) => {
  try {
    const { page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const enrollments = await db
    //   .select({
    //     id: enrollmentsTable.id,
    //     courseId: enrollmentsTable.courseId,
    //     enrolledAt: enrollmentsTable.enrolledAt,
    //     completedAt: enrollmentsTable.completedAt,
    //     progress: enrollmentsTable.progress,
    //     courseTitle: coursesTable.title,
    //     courseDescription: coursesTable.description,
    //     courseImageUrl: coursesTable.imageUrl,
    //   })
    //   .from(enrollmentsTable)
    //   .leftJoin(coursesTable, eq(enrollmentsTable.courseId, coursesTable.id))
    //   .where(eq(enrollmentsTable.userId, userId))
    //   .orderBy(desc(enrollmentsTable.enrolledAt))
    //   .limit(limit)
    //   .offset(offset);
    //
    // return c.json({
    //   enrollments,
    //   pagination: {
    //     page: parseInt(page),
    //     items: parseInt(items),
    //     hasNext: enrollments.length === limit,
    //   },
    // });
  } catch (error) {
    console.error("Get enrollments error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create enrollment
enrollmentsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { course_id } = body;

    if (!course_id) {
      return c.json({ error: "Course ID is required" }, 400);
    }

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    //
    // // Check if course exists
    // const course = await db
    //   .select()
    //   .from(coursesTable)
    //   .where(eq(coursesTable.id, course_id))
    //   .limit(1);
    //
    // if (course.length === 0) {
    //   return c.json({ error: "Course not found" }, 404);
    // }
    //
    // // Check if already enrolled
    // const existingEnrollment = await db
    //   .select()
    //   .from(enrollmentsTable)
    //   .where(and(eq(enrollmentsTable.courseId, course_id), eq(enrollmentsTable.userId, userId)))
    //   .limit(1);
    //
    // if (existingEnrollment.length > 0) {
    //   return c.json({ error: "Already enrolled in this course" }, 409);
    // }
    //
    // const newEnrollment = await db
    //   .insert(enrollmentsTable)
    //   .values({
    //     id: crypto.randomUUID(),
    //     userId,
    //     courseId: course_id,
    //     progress: 0,
    //   })
    //   .returning();
    //
    // return c.json(newEnrollment[0]);
  } catch (error) {
    console.error("Create enrollment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update enrollment
enrollmentsRoute.put("/:id", async (c) => {
  try {
    const enrollmentId = c.req.param("id");
    const body = await c.req.json();
    const { progress, completed_at } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const updateData: any = {};
    // if (progress !== undefined) updateData.progress = progress;
    // if (completed_at !== undefined) updateData.completedAt = completed_at;
    //
    // const updatedEnrollment = await db
    //   .update(enrollmentsTable)
    //   .set(updateData)
    //   .where(and(eq(enrollmentsTable.id, enrollmentId), eq(enrollmentsTable.userId, userId)))
    //   .returning();
    //
    // if (updatedEnrollment.length === 0) {
    //   return c.json({ error: "Enrollment not found or access denied" }, 404);
    // }
    //
    // return c.json(updatedEnrollment[0]);
  } catch (error) {
    console.error("Update enrollment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default enrollmentsRoute;
