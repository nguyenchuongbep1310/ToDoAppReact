import { useState } from 'react'


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("Todos")) ?? []
  );
  const [change, setChange] = useState(false);
  const [id, setId] = useState();
  const handleSubmit = () => {
    if (change) {
      handleupdate();
    } else {
      setTodos((prev) => {
        const newTodos = [...prev, todo];
        localStorage.setItem("Todos", JSON.stringify(newTodos));
        return newTodos;
      });
      setTodo("");
    }
  };

  const handleRemove = (index) => {
    setTodos((pre) => {
      const newTodos = pre.filter((item, id) => id !== index);
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  const handleupdate = () => {
    todos[id] = todo;
    setTodos((prev) => {
      const newTodos = [...prev];
      localStorage.setItem("Todos", JSON.stringify(newTodos));
      return newTodos;
    });
    setChange(false);
    setTodo("");
  };
  const handleChange = (index) => {
    setChange(true);
    setTodo(todos[index]);
    setId(index);
  };

  console.log(change);
  return (
    <div style={{ padding: 30 }} className="Todo">
      <input
        value={todo}
        onKeyDown={(e) => e.keyCode === 13 && todo && handleSubmit()}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          todo && handleSubmit();
        }}
      >
        {(change && "Save") || "Add"}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              onClick={() => {
                handleRemove(index);
              }}
              style={{ marginLeft: 30 }}
            >
              Remove
            </button>
            <button onClick={() => handleChange(index)}>changes</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
