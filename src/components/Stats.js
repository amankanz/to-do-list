export default function Stats({ todoItems }) {
  if (!todoItems.length) {
    return (
      <p className="stats">
        <em>Start adding some tasks to your To-Do list 🚀</em>
      </p>
    );
  }

  const num_tasks = todoItems.length;
  const num_completed_tasks = todoItems.filter(
    (todoItem) => todoItem.completed
  ).length;
  const percentage = Math.round((num_completed_tasks / num_tasks) * 100);
  return (
    <footer>
      <em>
        {percentage === 100
          ? `You got everything done! Felicitations! 🥳 `
          : `
        📝 You have ${num_tasks} tasks on your list, and you already completed ${num_completed_tasks}(${percentage}%)`}
      </em>
    </footer>
  );
}
