import { Provider as ReduxProvider } from "react-redux"

import { store } from "./store"

import { AddTodo } from "./components/AddTodo"
import { TodoList } from "./components/TodoList"

export function App() {
  return (
    <ReduxProvider store={store}>
      <TodoList />
      <AddTodo />
    </ReduxProvider>
  )
}
