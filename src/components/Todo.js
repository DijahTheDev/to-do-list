import React, { useState, useRef } from "react"
import { useTodos } from "../hooks"

export default props => {
  const { todos, add, del, toggle, count, filter, clear } = useTodos()
  const [todo, setTodo] = useState("")
  const inputEl = useRef(null)
  const [view, setView] = useState("all")
  const Pluralize = ({ count }, item, suffix = "s") =>
    `${count} ${item}${count !== 1 ? suffix : ""}`

  function handleSubmit(e) {
    e.preventDefault()
    add(todo)
    setTodo("")
    inputEl.current.focus()
  }

  function changeView(status) {
    setView(status)
    filter(status)
  }

  return (
    <div className="container">
      <div>
        <h1>To-Do List</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputEl}
            type="text"
            onChange={e => setTodo(e.target.value)}
            placeholder="Pay bills..."
            value={todo}
            className="inputField"
          />
          <button className="addTask" type="submit">
            Add
          </button>
        </form>
        <ul>
          {todos.map(todo => (
            <li
              key={"todo" + todo.id}
              className={todo.status === "completed" ? "completed" : ""}
              onClick={e => toggle(todo.id)}
            >
              {todo.text}{" "}
              <button className="deleteButton" onClick={e => del(todo.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="footer">
          <p>{Pluralize({ count }, "item")} left</p>
          <div className="filter">
            <label htmlFor="all">All</label>
            <input
              checked={view === "all" ? true : false}
              onChange={e => changeView("all")}
              name="view"
              id="all"
              type="radio"
            />
            <br />
            <label htmlFor="active">Active</label>
            <input
              checked={view === "active" ? true : false}
              onChange={e => changeView("active")}
              name="view"
              id="all"
              type="radio"
            />
            <br />
            <label htmlFor="completed">Completed</label>
            <input
              checked={view === "completed" ? true : false}
              onChange={e => changeView("completed")}
              name="view"
              id="all"
              type="radio"
            />
          </div>
          <button className="clear" onClick={e => clear()}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  )
}
