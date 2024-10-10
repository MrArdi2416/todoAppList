import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearTasks, deleteTask, toggleTaskStatus } from "../redux/taskSlice";
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";
import EditModal from "./EditModal";


interface Task {
  id: string;
  topic: string;
  info: string;
  status: string; 
}

const TaskList: React.FC = () => {

  const tasks = useSelector((state: RootState) => state.tasks.tasks) as Task[];
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>("all");


  const handleUpdateTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleToggleTaskStatus = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };


  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? task.status === "complete"
      : task.status !== "complete"
  );


  return (
  
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-4 py-2 w-full" 
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="pending">Pending Tasks</option>
          </select>
        </div>
        <div className="ml-4">
          {tasks.length > 0 && (
            <button
              onClick={() => dispatch(clearTasks())}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="h-[34rem] overflow-y-auto scrollbar-hide">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="max-w-3xl px-10 my-4 py-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex justify-end">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUpdateTask(task)}
                  className="text-sm rounded hover:text-orange-400"
                >
                  <RiEditBoxLine size={20} />
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-sm rounded hover:text-red-500"
                >
                  <RiDeleteBinLine size={20} />
                </button>

                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={task.status === "complete"}
                      onChange={() => handleToggleTaskStatus(task.id)}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full transition-colors duration-300 ${
                        task.status === "complete"
                          ? "bg-green-500"
                          : "bg-[#E5E7EB]"
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                        task.status === "complete" ? "translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl text-gray-700 font-bold hover:text-gray-600">
                {task.topic}
              </span>
            </div>

            <p className="mt-2 text-gray-600">{task.info}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EditModal
          task={selectedTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TaskList;
