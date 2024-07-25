import React, { useState } from "react";
import useTodo from "../hooks/useTodo";

function NewTask() {
  const { addTask } = useTodo();
  const [task, setTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(task);
  };

  return (
    <div className="mx-auto my-4">
      <form
        onSubmit={handleAddTask}
        className="mx-auto gap-6 flex justify-center"
      >
        <input
          type="text"
          placeholder="Add your task here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border rounded-lg py-2 px-4"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 px-4 rounded-lg transition-colors hover:bg-blue-700 text-white"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default NewTask;
