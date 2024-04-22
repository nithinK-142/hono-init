import { Hono } from "hono";
import { streamText } from "hono/streaming";
import TodoModel, { ITodo } from "../models/todo";

export const todosRouter = new Hono<{ Bindings: { app: Hono } }>()
  .get("/", async (c) => {
    const isCompletedParam = c.req.query("isCompleted");
    const isCompleted = isCompletedParam === "true";

    return streamText(c, async (stream) => {
      try {
        const todos = await TodoModel.find(
          isCompletedParam !== undefined ? { isCompleted } : {},
          { task: 1, _id: 0 }
        );

        for (const { task } of todos) {
          await stream.writeln(task);
          await stream.sleep(1000);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    });
  })
  .post("/", async (c) => {
    const newTodo: ITodo = await c.req.json();
    try {
      if (!newTodo.task) {
        c.status(400);
        return c.json({ message: "Invalid task field" });
      }

      if (
        newTodo.isCompleted !== undefined &&
        typeof newTodo.isCompleted !== "boolean"
      ) {
        c.status(400);
        return c.json({ message: "Invalid isCompleted field" });
      }

      await TodoModel.create(newTodo);
      c.status(200);
      return c.json("Task added 👍");
    } catch (error: any) {
      console.log(error.message);
      c.status(500);
      return c.json({ message: "Internal server error!" });
    }
  })
  .patch("/:id", async (c) => {
    const todoId = c.req.param("id");
    const updates: Partial<ITodo> = await c.req.json();
    try {
      await TodoModel.findByIdAndUpdate(todoId, { $set: updates });
      c.status(200);
      return c.json("Edit successfull 👍");
    } catch (error: any) {
      console.log(error.message);
      c.status(500);
      return c.json({ message: "Internal server error!" });
    }
  });
