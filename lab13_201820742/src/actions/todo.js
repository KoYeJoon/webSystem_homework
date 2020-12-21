let todoID = 0
export const createTodo = text => ({
    type: 'CREATE_TODO',
    id: todoID++,
    text
})

export const deleteTodo = text => ({
    type: 'DELETE_TODO',
    text
})


export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})


