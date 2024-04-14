import { Hono } from "hono";
import { streamTextRouter } from "./routes/streamText";
import { dbConnect } from "./database/config";
import TodoModel from "./models/todo";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", streamTextRouter);

dbConnect()
  .then(async () => {
    const todos = await TodoModel.find();
    console.log(todos);
  })
  .catch((err) => {
    console.log(err.message);
  });

export default app;
