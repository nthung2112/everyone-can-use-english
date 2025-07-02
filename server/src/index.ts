import { serve } from "@hono/node-server";
import { Hono } from "hono";
import usersRoute from "./routes/users-route";
import sessionRouter from "./routes/sessions-route";
import commonRoute from "./routes/common-route";

const app = new Hono();

// add users route to app
app.route("/", commonRoute);
app.route("/api/sessions", sessionRouter);
app.route("/api/users", usersRoute);

// set port
const port = process.env.PORT ? Number(process.env.PORT) : 9000;
console.log(`Server is running on http://localhost:${port}`);

// serve app
serve({
  fetch: app.fetch,
  port,
});
