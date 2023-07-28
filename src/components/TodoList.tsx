import { useSelector } from "react-redux"

export function TodoList() {
  const todos = useSelector((state) => state.todo)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  )
}
