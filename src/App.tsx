import "./App.css";
import { Provider } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import store, { persistor } from "./redux/store";
import Navbar from "./components/Navbar";
import { GrNewWindow } from "react-icons/gr";
import { FaListUl } from "react-icons/fa6";
import { PersistGate } from "redux-persist/integration/react";


function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <div className="flex flex-col h-screen">
          <Navbar /> 
       <div className="flex flex-col md:flex-row h-max bg-[#cdecea56]  p-5 gap-3">

      <div className="md:w-1/2 p-14 bg-[#cdd9ecb0] rounded-lg shadow-md">
      <div className="flex items-center">
      <GrNewWindow size={20} className="ml-2"/>
        <h1 className="text-xl ml-5 md:text-3xl  my-2  dark:text-gray-200">
         Add Task</h1>
       </div>
        <TaskForm />  
      </div>

      <div className="md:w-1/2 p-14 bg-[#bdc0ecb0] rounded-lg shadow-md mt-5 md:mt-0">
      <div className="flex items-center">
      <FaListUl  size={25} className="ml-2"/>
        <h1 className="text-xl ml-5 md:text-3xl  my-2  dark:text-gray-200">
         Task Details</h1>
       </div>
        <TaskList />
      </div>
     </div>
       </div>
       </PersistGate>
  </Provider>
  );
}

export default App;
