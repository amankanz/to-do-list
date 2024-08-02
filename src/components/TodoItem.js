import Button from "./Button";

export default function TodoItem({ todo, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(todo.id)} />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <Button onClick={() => onDeleteItem(todo.id)}>❌</Button>
    </li>
  );
}
