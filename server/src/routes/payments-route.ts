import { Hono } from "hono";
import { db } from "../db/index";
import { paymentsTable, usersTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";

const paymentsRoute = new Hono();

// Get payments
paymentsRoute.get("/", async (c) => {
  try {
    const { payment_type, page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const whereConditions = [eq(paymentsTable.userId, userId)];
    // if (payment_type) {
    //   whereConditions.push(eq(paymentsTable.paymentType, payment_type));
    // }
    //
    // const payments = await db
    //   .select()
    //   .from(paymentsTable)
    //   .where(and(...whereConditions))
    //   .orderBy(desc(paymentsTable.createdAt))
    //   .limit(limit)
    //   .offset(offset);
    //
    // return c.json({
    //   payments,
    //   pagination: {
    //     page: parseInt(page),
    //     items: parseInt(items),
    //     hasNext: payments.length === limit,
    //   },
    // });
  } catch (error) {
    console.error("Get payments error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get specific payment
paymentsRoute.get("/:id", async (c) => {
  try {
    const paymentId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const payment = await db
    //   .select()
    //   .from(paymentsTable)
    //   .where(and(eq(paymentsTable.id, paymentId), eq(paymentsTable.userId, userId)))
    //   .limit(1);
    //
    // if (payment.length === 0) {
    //   return c.json({ error: "Payment not found" }, 404);
    // }
    //
    // return c.json(payment[0]);
  } catch (error) {
    console.error("Get payment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create payment
paymentsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { amount, reconciled_currency, processor, payment_type } = body;

    if (!amount || !processor || !payment_type) {
      return c.json({ error: "Amount, processor, and payment_type are required" }, 400);
    }

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const newPayment = await db
    //   .insert(paymentsTable)
    //   .values({
    //     id: crypto.randomUUID(),
    //     userId,
    //     amount,
    //     reconciledCurrency: reconciled_currency || "USD",
    //     processor,
    //     paymentType: payment_type,
    //     status: "pending",
    //   })
    //   .returning();
    // return c.json(newPayment[0]);
  } catch (error) {
    console.error("Create payment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default paymentsRoute;
