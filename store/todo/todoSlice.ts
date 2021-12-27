import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { addTodo, getTodos } from "../../services/api/todoApi";

export interface Todo {
  id?: string | number;
  description: string;
  deadline: string;
  done: boolean;
}

export interface TodoState {
  isLoading: boolean;
  isFailed: boolean;
  todos: Todo[];
}

const initialState: TodoState = {
  isLoading: false,
  isFailed: false,
  todos: [],
};

export const fetchTodos = createAsyncThunk(
  "todo/getAll",
  async (_, { rejectWithValue }) => {
    return await getTodos()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const addNewTodo = createAsyncThunk<any, Todo>(
  "todo/addNewTodo ",
  async (data, { rejectWithValue }) => {
    return await addTodo(data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const counterSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.isFailed = true;
        state.todos = initialState.todos;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(addNewTodo.rejected, (state) => {
        state.isLoading = false;
        state.isFailed = true;
        state.todos = initialState.todos;
      });
  },
});

export default counterSlice.reducer;
