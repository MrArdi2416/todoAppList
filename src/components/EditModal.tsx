import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { IoMdCloseCircle } from "react-icons/io";



interface EditModalProps {
  task: { id: string; topic: string; info: string } | null; 
  onClose: () => void; 
}

const EditModal: React.FC<EditModalProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    if (task) {
      setTopic(task.topic);
      setInfo(task.info);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) return; 
    
    if (task && task.id) {
      dispatch(updateTask({
          id: task.id, topic, info,
          status: "pending"
      })); 
      onClose(); 
      console.error("Task is not defined or does not have an id.");
    }
  };

  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-16 py-14 rounded-md text-center relative">
      
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
       <IoMdCloseCircle size={30} color="red"/>

          
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Task Title"
              maxLength={50}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 h-14 focus:ring focus:outline-none"
            />

            <textarea
              placeholder="More info about Task"
              maxLength={75}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="block w-full h-40 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
            />
          </div>

          <h1 className="text-xl mb-4 font-bold mt-4 text-slate-500">
            Do you Want to Update this task?
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
