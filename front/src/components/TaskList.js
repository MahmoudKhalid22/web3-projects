import React from "react";
import useTodo from "../hooks/useTodo";

function TaskList() {
  const { tasks, setCompletedTask, deleteTasks } = useTodo();
  console.log(tasks);
  return (
    <div className="flex flex-col gap-6 w-fit mx-auto my-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex gap-6 bg-blue-600 text-white rounded-xl py-4 px-8 items-center justify-between"
        >
          <div className="flex gap-2 items-center ">
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={task.completed}
              onChange={() => setCompletedTask(task.id)}
            />
            <p
              className={`font-bold text-gray-200 ${
                task.completed ? "line-through" : ""
              } `}
            >
              {task.content}
            </p>
          </div>
          <button
            className="bg-red-700 text-white py-2 px-4 text-base rounded-lg"
            onClick={() => deleteTasks(task.id)}
          >
            Delete Task
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
