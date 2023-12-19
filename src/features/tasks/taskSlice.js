import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const foundTask = state.find((task) => task.id === id);
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
      }
    },
    deleteTask: (state, action) => {
      const taskFound = state.findIndex(({ id }) => action.payload === id);
      if (taskFound != -1) {
        state.splice(taskFound, 1);
      }
    },

    completedTask: (state, aciton) => {
      const foundTask = state.find((task) => task.id === aciton.payload);
      if (foundTask) {
        foundTask.complete = true;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, completedTask } =
  taskSlice.actions;
export default taskSlice.reducer;
