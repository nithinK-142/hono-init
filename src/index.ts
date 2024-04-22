import { Hono } from "hono";
import { streamTextRouter } from "./routes/streamText";
import { dbConnect } from "./database/config";
import { todosRouter } from "./routes/todos";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/stream", streamTextRouter);
app.route("/api/v1/todos", todosRouter);

dbConnect();

export default app;
