import { Hono } from "hono";
import { streamTextRouter } from "./routes/streamText";
import { dbConnect } from "./database/config";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/stream", streamTextRouter);

dbConnect();

export default app;
