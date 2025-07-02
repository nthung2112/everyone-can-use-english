import { Hono } from "hono";
import { db } from "../db/index";
import { usersTable, followsTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";

// create common route for authentication and user management
const usersRoute = new Hono();

// Update user profile
usersRoute.put("/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const body = await c.req.json();
    const { name, email, code } = body;

    if (!userId) {
      return c.json({ error: "User ID is required" }, 400);
    }

    // TODO: Verify that the requesting user has permission to update this profile
    // This should check JWT token and ensure user can only update their own profile

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) {
      // Verify email ownership with code if provided
      if (code) {
        // TODO: Implement email verification logic
        // For now, we'll accept the email change
      }
      updateData.email = email;
    }

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No valid fields to update" }, 400);
    }

    const updatedUser = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(updatedUser[0]);
  } catch (error) {
    console.error("Update profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get users rankings
usersRoute.get("/rankings", async (c) => {
  try {
    const { range = "month" } = c.req.query();

    // TODO: Implement ranking logic based on points/activity
    const rankings = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.avatar,
        points: usersTable.points,
      })
      .from(usersTable)
      .orderBy(desc(usersTable.points))
      .limit(50);

    return c.json(rankings);
  } catch (error) {
    console.error("Get rankings error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get users list
usersRoute.get("/", async (c) => {
  try {
    const { type = "all", page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.avatar,
        points: usersTable.points,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({
      users,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: users.length === limit,
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get specific user
usersRoute.get("/:id", async (c) => {
  try {
    const userId = c.req.param("id");

    const user = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.avatar,
        points: usersTable.points,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user[0]);
  } catch (error) {
    console.error("Get user error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user following
usersRoute.get("/:id/following", async (c) => {
  try {
    const userId = c.req.param("id");
    const { page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const following = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.avatar,
        points: usersTable.points,
      })
      .from(followsTable)
      .innerJoin(usersTable, eq(followsTable.followingId, usersTable.id))
      .where(eq(followsTable.followerId, userId))
      .limit(limit)
      .offset(offset);

    return c.json({
      following,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: following.length === limit,
      },
    });
  } catch (error) {
    console.error("Get user following error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user followers
usersRoute.get("/:id/followers", async (c) => {
  try {
    const userId = c.req.param("id");
    const { page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const followers = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        avatar: usersTable.avatar,
        points: usersTable.points,
      })
      .from(followsTable)
      .innerJoin(usersTable, eq(followsTable.followerId, usersTable.id))
      .where(eq(followsTable.followingId, userId))
      .limit(limit)
      .offset(offset);

    return c.json({
      followers,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: followers.length === limit,
      },
    });
  } catch (error) {
    console.error("Get user followers error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Follow user
usersRoute.post("/:id/follow", async (c) => {
  try {
    const targetUserId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const currentUserId = extractUserIdFromToken(authHeader);
    //
    // if (currentUserId === targetUserId) {
    //   return c.json({ error: "Cannot follow yourself" }, 400);
    // }
    //
    // const newFollow = await db
    //   .insert(followsTable)
    //   .values({
    //     followerId: currentUserId,
    //     followingId: targetUserId,
    //   })
    //   .onConflictDoNothing()
    //   .returning();
    //
    // return c.json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Follow user error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Unfollow user
usersRoute.delete("/:id/unfollow", async (c) => {
  try {
    const targetUserId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const currentUserId = extractUserIdFromToken(authHeader);
    //
    // await db
    //   .delete(followsTable)
    //   .where(and(
    //     eq(followsTable.followerId, currentUserId),
    //     eq(followsTable.followingId, targetUserId)
    //   ));
    //
    // return c.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow user error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// export users route
export default usersRoute;
