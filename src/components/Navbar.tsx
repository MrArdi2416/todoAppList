import React from "react";
import { LuListTodo } from "react-icons/lu";

const Navbar = () => {
  return (
    <>
      <nav className="font-sans flex  items-center text-center content-center sm:flex-row sm:text-left sm:justify-between py-3 px-6 bg-[#3b1c81] shadow sm:items-baseline w-full h-24">
        <div className="flex items-center h-full">
          <LuListTodo size={40} color="white" />
          <h2 className="bg-clip-text ml-4 text-white text-3xl font-black">
            Todo List
          </h2>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
