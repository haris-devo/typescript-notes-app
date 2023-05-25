interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {


  
  return (
    <>
      <form
        className="
            flex 
        "
        onSubmit={handleAdd}
      >
        <input
          type="text"
          placeholder="Enter the Note Here"
          className="task-input py-4 border-none  px-6 rounded-md shadow-lg shadow-gray-600 w-full mr-3 h-20 
           focus:outline-none text-black font-medium text-xl"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className=" py-4 border-none  bg-slate-800 text-white px-6 rounded-md shadow-lg shadow-gray-600 text-lg z-10 hover:bg-red-600"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default InputField;
