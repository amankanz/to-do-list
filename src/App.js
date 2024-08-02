import { useState } from "react";

const initial_todos = [
  { text: "Buy groceries", completed: true, id: 2345 },
  { text: "Walk the dog", completed: false, id: 2327 },
  { text: "Read a book", completed: false, id: 2300 },
];

export default function App() {
  return (
    <main className="App">
      <h1>To-Do List</h1>
      <TodoList />
    </main>
  );
}

function TodoList() {
  const [todoItems, setTodoItems] = useState(initial_todos);
  // const [deleteItem, setDeleteItem] = useState()

  function handleAddtodoItem(todoItem) {
    setTodoItems((todoItems) => [...todoItems, todoItem]);
  }

  function handleDeleteItem(id) {
    setTodoItems(todoItems.filter((todoItem) => todoItem.id !== id));
  }

  function handleToggleItem(id) {
    setTodoItems((todoItems) =>
      todoItems.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      )
    );
  }

  return (
    <section>
      <AddTodoForm onAddtodo={handleAddtodoItem} />
      <ul>
        {todoItems.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todo={todoItem}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      <Stats />
    </section>
  );
}

function TodoItem({ todo, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(todo.id)} />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDeleteItem(todo.id)}>❌</button>
    </li>
  );
}

function AddTodoForm({ onAddtodo }) {
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
    console.log(new_todo);

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
      <button>Add</button>
    </form>
  );
}

function Stats() {
  return (
    <footer>
      <em>
        💼 You have X tasks on your list, and you already completed X (X%)
      </em>
    </footer>
  );
}
