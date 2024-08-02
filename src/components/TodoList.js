import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import Stats from "./Stats";
import Button from "./Button";

const initial_todos = [
  { text: "Buy groceries", completed: false, id: 2345 },
  { text: "Walk the dog", completed: false, id: 2327 },
  { text: "Read a book", completed: false, id: 2300 },
];

export default function TodoList() {
  const [todoItems, setTodoItems] = useState(initial_todos);
  const [sortBy, setSortBy] = useState("input");

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

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );
    if (confirmed) setTodoItems([]);
  }

  let sortedItems;

  if (sortBy === "input") sortedItems = todoItems;

  if (sortBy === "description") {
    sortedItems = todoItems
      .slice()
      .sort((a, b) => a.text.localeCompare(b.text));
  }

  if (sortBy === "completed") {
    sortedItems = todoItems
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  return (
    <section>
      <AddTodoForm onAddtodo={handleAddtodoItem} />
      <ul>
        {sortedItems.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            todo={todoItem}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="completed">Sort by completed status</option>
        </select>
        <Button onClick={handleClearList}>Clear List</Button>
      </div>

      <Stats todoItems={todoItems} />
    </section>
  );
}
