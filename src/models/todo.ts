import { Schema, Document, model } from "mongoose";

export interface ITodo extends Document {
  task: string;
  isCompleted: boolean;
}

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const TodoModel = model<ITodo>("hono-todos", TodoSchema);

export default TodoModel;
