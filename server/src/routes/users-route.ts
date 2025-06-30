import { Hono } from "hono";
import { db } from "../db";
import { usersTable, followsTable } from "../db/schema";
import { eq, desc, sql, and, like, or } from "drizzle-orm";
import { randomBytes } from "crypto";

// create users route
const usersRoute = new Hono();

// Generate unique ID
function generateId(): string {
  return randomBytes(16).toString("hex");
}

// get all users with optional filtering
usersRoute.get("/", async (c) => {
  const { limit = "20", offset = "0", search } = c.req.query();

  const baseQuery = db.select().from(usersTable);

  if (search) {
    const users = await baseQuery
      .where(or(like(usersTable.name, `%${search}%`), like(usersTable.email, `%${search}%`)))
      .limit(Number(limit))
      .offset(Number(offset))
      .orderBy(desc(usersTable.createdAt));
    return c.json(users);
  }

  const users = await baseQuery
    .limit(Number(limit))
    .offset(Number(offset))
    .orderBy(desc(usersTable.createdAt));

  return c.json(users);
});

// create a new user
usersRoute.post("/", async (c) => {
  const {
    name,
    email,
    phoneNumber,
    mixinId,
    githubId,
    avatar,
    locale = "en",
    settings,
  } = await c.req.json();

  // Generate unique ID
  const id = generateId();

  try {
    const newUser = await db
      .insert(usersTable)
      .values({
        id,
        name,
        email,
        phoneNumber,
        mixinId,
        githubId,
        avatar,
        locale,
        settings: settings ? JSON.stringify(settings) : null,
      })
      .returning();

    return c.json(newUser[0], 201);
  } catch (error) {
    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return c.json({ error: "User with this email, phone, or provider ID already exists" }, 409);
    }
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// get a user by id
usersRoute.get("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);

  if (user.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  // Parse settings JSON if it exists
  const userData = { ...user[0] };
  if (userData.settings) {
    try {
      userData.settings = JSON.parse(userData.settings);
    } catch (e) {
      // Keep as string if JSON parsing fails
    }
  }

  return c.json(userData);
});

// update a user by id
usersRoute.put("/:id", async (c) => {
  const { id } = c.req.param();
  const { name, email, phoneNumber, mixinId, githubId, avatar, locale, settings } =
    await c.req.json();

  const updateData: Record<string, any> = {
    name,
    email,
    phoneNumber,
    mixinId,
    githubId,
    avatar,
    locale,
    settings: settings ? JSON.stringify(settings) : undefined,
    updatedAt: sql`CURRENT_TIMESTAMP`,
  };

  // Remove undefined values
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  try {
    const updatedUserResult = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, id))
      .returning();

    if (updatedUserResult.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    const userData = { ...updatedUserResult[0] };
    if (userData.settings) {
      try {
        userData.settings = JSON.parse(userData.settings);
      } catch (e) {
        // Keep as string if JSON parsing fails
      }
    }

    return c.json(userData);
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return c.json({ error: "User with this email, phone, or provider ID already exists" }, 409);
    }
    return c.json({ error: "Failed to update user" }, 500);
  }
});

// delete a user by id
usersRoute.delete("/:id", async (c) => {
  const { id } = c.req.param();

  const deletedUser = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();

  if (deletedUser.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ message: "User deleted successfully", user: deletedUser[0] });
});

// get user followers
usersRoute.get("/:id/followers", async (c) => {
  const { id } = c.req.param();
  const { limit = "20", offset = "0" } = c.req.query();

  const followers = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.avatar,
      createdAt: followsTable.createdAt,
    })
    .from(followsTable)
    .innerJoin(usersTable, eq(followsTable.followerId, usersTable.id))
    .where(eq(followsTable.followingId, id))
    .limit(Number(limit))
    .offset(Number(offset))
    .orderBy(desc(followsTable.createdAt));

  return c.json(followers);
});

// get user following
usersRoute.get("/:id/following", async (c) => {
  const { id } = c.req.param();
  const { limit = "20", offset = "0" } = c.req.query();

  const following = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.avatar,
      createdAt: followsTable.createdAt,
    })
    .from(followsTable)
    .innerJoin(usersTable, eq(followsTable.followingId, usersTable.id))
    .where(eq(followsTable.followerId, id))
    .limit(Number(limit))
    .offset(Number(offset))
    .orderBy(desc(followsTable.createdAt));

  return c.json(following);
});

// follow a user
usersRoute.post("/:id/follow", async (c) => {
  const { id: followingId } = c.req.param();
  const { followerId } = await c.req.json();

  if (followerId === followingId) {
    return c.json({ error: "Cannot follow yourself" }, 400);
  }

  try {
    const follow = await db
      .insert(followsTable)
      .values({
        followerId,
        followingId,
      })
      .returning();

    return c.json(follow[0], 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return c.json({ error: "Already following this user" }, 409);
    }
    return c.json({ error: "Failed to follow user" }, 500);
  }
});

// unfollow a user
usersRoute.delete("/:id/follow", async (c) => {
  const { id: followingId } = c.req.param();
  const { followerId } = await c.req.json();

  const unfollowResult = await db
    .delete(followsTable)
    .where(and(eq(followsTable.followerId, followerId), eq(followsTable.followingId, followingId)))
    .returning();

  if (unfollowResult.length === 0) {
    return c.json({ error: "Follow relationship not found" }, 404);
  }

  return c.json({ message: "Successfully unfollowed user" });
});

// export users route
export default usersRoute;
