import { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleNote = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const updatedTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: editTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEdit(false);
  };

  const inputEdit = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEdit.current?.focus();
  }, [edit]);

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={todo.id}
            className={`cursor-pointer flex justify-between items-center bg-slate-900 text-white px-6 rounded-md shadow-lg shadow-gray-600 text-lg my-4 py-4
                      transition-all  ${
                        todo.completed &&
                        "line-through text-gray-500 bg-slate-400 opacity-50"
                      }`}
          >
            <span
              className={`cursor-pointer ${
                todo.completed && "line-through text-gray-500 "
              }`}
            >
              {edit ? (
                <form>
                  <input
                    ref={inputEdit}
                    type="text"
                    placeholder="Enter the Note Here"
                    className="task-input py-2 border-none  px-6 rounded shadow-lg shadow-gray-600 w-3/4 mr-3 
                        focus:outline-none text-black font-medium text-xl"
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                  />
                  <button
                    className="  hover:bg-red-600 py-1"
                    type="submit"
                    onClick={(e) => handleEdit(e, todo.id)}
                  >
                    Add
                  </button>
                </form>
              ) : (
                todo.todo
              )}
            </span>
            <div className="flex items-center">
              <button
                className=" text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleEdit(setEdit(true))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <button
                className="bg-green-800 text-white px-4 py-2 rounded-md ml-4"
                onClick={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              >
                {todo.completed ? (
                  ""
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default SingleNote;
