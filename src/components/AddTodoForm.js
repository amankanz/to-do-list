import { useState } from "react";
import Button from "./Button";

export default function AddTodoForm({ onAddtodo }) {
  const [newTask, setNewTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!newTask) return;

    const id = crypto.randomUUID();
    const new_todo = {
      text: newTask,
      completed: false,
      id,
    };

    onAddtodo(new_todo);
    // console.log(new_todo);

    setNewTask("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        placeholder="Add a new task"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
