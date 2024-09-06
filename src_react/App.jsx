import { useEffect, useRef, useState } from "react";

export default function App() {
  const [state, setState] = useState({
    todoList: localSync(),
    todoInput: "",
  });

  useEffect(() => {
    localSync(true);
  },[state.todoList])

  function addTodo() {
    const todo = {
      id: Date.now(),
      status: false,
      todo: state.todoInput,
    };

    setState((prev) => ({ todoInput: "", todoList: [...prev.todoList, todo] }));
  }

  function deleteTodo(id){
    const updatedList = state.todoList.filter(todo => todo.id !== id);
    setState((prev) => ({...prev, todoList: updatedList}))
  }

  function toggleStatus(id){
    const index = state.todoList.findIndex(todo => todo.id == id);
    const updatedList = [...state.todoList];
    updatedList[index].status = !updatedList[index].status;
    setState((prev) => ({...prev, todoList: updatedList}))
  }

  function localSync(set = false){
    if(set){
      localStorage.setItem('todos', JSON.stringify(state.todoList));
      return state.todoList;
    }else{
      return JSON.parse(localStorage.getItem('todos') ?? "[]")
    }
  }

  return (
    <>
      <div className="container pt-14 mx-auto">
        <div className="actions flex justify-center pt-10">
          <input
            type="text"
            value={state.todoInput}
            onChange={(e) =>
              setState((prev) => ({ ...prev, todoInput: e.target.value }))
            }
            placeholder="Enter Todo Here"
            className=" outline-none rounded-md rounded-r-none px-2 py-1 w-1/2"
          />
          <button
            type="button"
            onClick={addTodo}
            className="px-5 py-1.5 rounded-l-none rounded-md bg-cyan-600 text-white"
          >
            Add
          </button>
        </div>

        <div className="todo-list w-2/3 mx-auto mt-8 flex flex-col gap-2">
          {state.todoList.map((todo) => {
            return (
              <div
                key={todo.id}
                className="todo flex w-full p-2 bg-cyan-800 text-white mx-auto items-center rounded-md"
              >
                <div className="status px-2 flex items-center">
                  <input
                    type="checkbox"
                    className="outline-none h-4 w-4 leading-none accent-cyan-400"
                    checked={todo.status}
                    onChange={() => toggleStatus(todo.id)}
                    name="status"
                    id="status"
                  />
                </div>
                <div className="title flex-1">
                  <p className={`max-w-full overflow-ellipsis ${todo.status ? 'line-through' : ''}`}  >{todo.todo}</p>
                </div>
                <div className="action px-2 text-black">
                  <button className="bg-rose-200 px-2 rounded-md" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
