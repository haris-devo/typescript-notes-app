import { useState } from "react";
import InputField from "./InputField";
import { Todo } from "../components/model";
import TodoList from "./TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const MainNotes: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);

  // const [completed, setCompleted] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTodo = { id: Date.now(), todo, completed: false };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    const newTodos = [...todos];
    const [reorderedItem] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, reorderedItem);
    setTodos(newTodos);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center w-full bg-gradient-to-r from-gray-700 bg-green-200 h-screen ">
          <header className="App-header my-4 w-[60%]">
            <h1 className="text-4xl text-center font-bold mb-5 tracking-widder">
              TASKIFY
            </h1>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList todos={todos} setTodos={setTodos} />
          </header>
        </div>
      </DragDropContext>
    </>
  );
};

export default MainNotes;
