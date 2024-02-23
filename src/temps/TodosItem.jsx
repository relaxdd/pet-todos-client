const TodosItem = ({ todo: { id, title, completed }, onChange }) => {
  return (
    <li key={id}>
      <input type="hidden" name="todo_id" value={id} />
      <label>
        <input
          name="todo_completed"
          type="checkbox"
          checked={Boolean(completed)}
          onChange={() => onChange(id)}
        />

        <span>{title}</span>
      </label>
    </li>
  );
};

export default TodosItem;
