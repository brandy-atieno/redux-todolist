import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const result = await fetch("http://localhost:7000/todos");
    if (result.ok) {
      const todos = await result.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (payload) => {
    const result = await fetch("http://localhost:7000/todos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (result.ok) {
      const todo = await result.json();
      return { todo };
    }
  }
);
export const toggleCompletedTodoAsync = createAsyncThunk(
  "todos/toggleCompletedTodoAsync",
  async (payload) => {
    const result = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (result.ok) {
      const todo = await result.json();
      return { todo };
    }
  }
);

export const deleteTodoAsync=createAsyncThunk('todos/deleteTodoAync',
async(payload)=>{
    const result = await fetch(`http://localhost:7000/todos/${payload.id}`, {
    method:'DELETE',
    
})
if (result.ok) {
    return { id:payload.id };}
});
const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 1,
      title: "Buy Ford Raptor",
      completed: false,
    },
    {
      id: 2,
      title: "Move Out",
      completed: false,
    },
    {
      id: 3,
      title: "Retouch dredz",
      completed: true,
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log("Fetched");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log("Fetched");
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompletedTodoAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todo.id);
      state[index].completed = action.payload.todo.completed;
    },
   [ deleteTodoAsync]: (state, action) => {
        return state.filter((todo) => todo.id !== action.payload.id);
      },
  },
});
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
