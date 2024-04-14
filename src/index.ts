import { Hono } from "hono";
import { streamTextRouter } from "./routes/streamText";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", streamTextRouter);

export default app;
