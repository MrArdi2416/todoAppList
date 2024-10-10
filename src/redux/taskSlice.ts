import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  topic: string;
  info: string;
  status: "pending" | "complete";
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    toggleTaskStatus(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "pending" ? "complete" : "pending";   
      }
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { addTask, updateTask, clearTasks, deleteTask, toggleTaskStatus  } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export default tasksSlice.reducer;
