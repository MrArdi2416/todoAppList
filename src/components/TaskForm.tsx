import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); 
    if (!topic ) {
      setError('Both fields are required.');
      return;
    }
    dispatch(addTask({
        id: Date.now().toString(), topic, info,
        status: 'pending'
    }));
    setTopic('');
    setInfo('');
  };

  return (
  <div className='mt-8'>
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Task Title"
          maxLength={50}
        className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 h-14 focus:ring focus:outline-none"

        />
        {error && !topic && <p className="text-red-500 text-xl ml-2"> Task Title Required</p>}

        <textarea
          value={info}
          onChange={(e) => setInfo(e.target.value)} 
          placeholder="More info about Task"
          maxLength={75}
          className="block w-full h-40 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"

        />

      </div>
      <button type="submit" className="bg-blue-500 text-white mt-4 px-4 py-2 rounded">
        Create New Task
      </button>
    </form>
  </div>
  );
};

export default TaskForm;
