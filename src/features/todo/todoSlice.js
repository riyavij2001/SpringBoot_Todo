import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: "1", text: "Hello World!"}],
    shouldUpdate: false
}

export const todoSlice = createSlice({
    name: 'ToDo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: action.payload.id,
                text: action.payload.text,
                description: action.payload.description
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        editTodo: (state, action) => {
            console.log("Edit data: ",action.payload)
            debugger;
            const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id)
            state.todos[todoIndex].text = action.payload.text
        },
        setTodoState: (state, action) => {
            state.todos = action.payload
        },
        updateList: (state, action) => {
            state.shouldUpdate = action.payload
        }

    }
})

export const {addTodo, removeTodo, editTodo, updateList, setTodoState} = todoSlice.actions

export default todoSlice.reducer

export const selectId = (state, id) => state.todo.todos.find(todo => todo.id === id)