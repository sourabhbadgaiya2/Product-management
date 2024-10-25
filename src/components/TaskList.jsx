import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      isComplete: false,
      id: nanoid(),
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <form onSubmit={submitHandler} className='w-full max-w-md'>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='w-full p-2 mb-2 border border-gray-400 rounded'
          type='text'
          placeholder='Task Title'
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full p-2 mb-2 border border-gray-400 rounded'
          type='text'
          placeholder='Task Description'
        />
        <button
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Add Task
        </button>
      </form>

      <ul className='mt-4 w-full max-w-md'>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between p-2 mb-2 border rounded ${
              task.isComplete ? "bg-green-100" : "bg-white"
            }`}
          >
            <div>
              <h3
                className={`text-lg font-semibold ${
                  task.isComplete ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>
              <p className={task.isComplete ? "line-through" : ""}>
                {task.description}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => toggleComplete(task.id)}
                className='p-1 text-sm text-white bg-green-500 rounded hover:bg-green-600'
              >
                {task.isComplete ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => editTask(task.id)}
                className='p-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600'
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className='p-1 text-sm text-white bg-red-500 rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
