import reducer, { addNewTodo, fetchTodos, initialState, removeTodo, Todo, updateTodo } from 'store/todo/todoSlice'
import * as todoApi from 'services/api/todoApi'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { AxiosResponse } from 'axios';

const mockStore = configureStore([thunk]);
const spyGetTodos = jest.spyOn(todoApi, 'getTodos');
const spyAddTodos = jest.spyOn(todoApi, 'addTodo');
const spyEditTodos = jest.spyOn(todoApi, 'editTodo');
const spyDeleteTodos = jest.spyOn(todoApi, 'deleteTodo');

const responseSuccess = [
    {
        "id": 2,
        "description": "hello world",
        "deadline": "2019-09-19T07:45:51.377Z",
        "done": false
    }
]

describe('Todo Slice', () => {
    it('should set loading true while action is pending', () => {
        const action = { type: fetchTodos.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, isLoading: true });
    });

    it('should set todos when action is fulfilled with correct response', () => {
        const action = { type: fetchTodos.fulfilled.type, payload: responseSuccess };
        const state = reducer(initialState, action);
        expect(state).toEqual({ isLoading: false, isFailed: false, todos: responseSuccess });
    });

    it('should set correct response when action is rejected', () => {
        const action = { type: fetchTodos.rejected.type, payload: initialState.todos };
        const state = reducer(initialState, action);
        expect(state).toEqual({ isLoading: false, isFailed: true, todos: initialState.todos });
    });

    const responseTodos = [
        {
            "id": 2,
            "description": "hello world",
            "deadline": "2019-09-19T07:45:51.377Z",
            "done": false
        }
    ]

    it('should handle success api get all todos', () => {
        spyGetTodos.mockImplementationOnce(() => Promise.resolve(responseTodos));

        const store = mockStore({});
        return store.dispatch(fetchTodos()).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/getAll/pending' },
                { payload: responseTodos, type: 'todo/getAll/fulfilled' },
            ]);
        });
    });

    const data = {
        deadline: "2021-12-19T07:45:51.377Z",
        description: "Learn React",
        done: false
    }

    it('should handle success api add todo', () => {
        spyAddTodos.mockImplementationOnce(() => Promise.resolve(data));

        const store = mockStore({});
        return store.dispatch(addNewTodo(data)).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/addNewTodo/pending' },
                { payload: data, type: 'todo/addNewTodo/fulfilled' },
            ]);
        });
    });

    const id = 2

    it('should handle success api delete todo', () => {
        spyDeleteTodos.mockImplementationOnce(() => Promise.resolve(id));

        const store = mockStore({});
        return store.dispatch(removeTodo(id)).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/removeTodo/pending' },
                { payload: id, type: 'todo/removeTodo/fulfilled' },
            ]);
        });
    });

    const dataEdit = {
        deadline: "2021-12-19T07:45:51.377Z",
        description: "Learn React",
        done: false,
        id: 2
    }

    it('should handle success api update todo', () => {
        spyEditTodos.mockImplementationOnce(() => Promise.resolve(dataEdit));

        const store = mockStore({});
        return store.dispatch(updateTodo(dataEdit)).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/updateTodo/pending' },
                { payload: dataEdit, type: 'todo/updateTodo/fulfilled' },
            ]);
        });
    });

    it('should handle failed api get all todos', () => {
        spyGetTodos.mockImplementationOnce(() => Promise.reject(false));

        const store = mockStore({});
        return store.dispatch(fetchTodos()).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/getAll/pending' },
                { payload: false, type: 'todo/getAll/rejected' },
            ]);
        });
    });

    it('should handle failed api add todo', () => {
        spyAddTodos.mockImplementationOnce(() => Promise.reject(false));

        const store = mockStore({});
        return store.dispatch(addNewTodo(data)).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/addNewTodo/pending' },
                { payload: false, type: 'todo/addNewTodo/rejected' },
            ]);
        });
    });

    it('should handle failed api delete todo', () => {
        spyDeleteTodos.mockImplementationOnce(() => Promise.reject(false));

        const store = mockStore({});
        return store.dispatch(removeTodo(data)).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/removeTodo/pending' },
                { payload: false, type: 'todo/removeTodo/rejected' },
            ]);
        });
    });

    it('should handle failed api update todo', () => {
        spyEditTodos.mockImplementationOnce(() => Promise.reject(false));

        const store = mockStore({});
        return store.dispatch(updateTodo(dataEdit)).then(() => {
            expect(
                store.getActions().map((action) => ({
                    type: action.type,
                    payload: action.payload,
                }))
            ).toEqual([
                { payload: undefined, type: 'todo/updateTodo/pending' },
                { payload: false, type: 'todo/updateTodo/rejected' },
            ]);
        });
    });
});
