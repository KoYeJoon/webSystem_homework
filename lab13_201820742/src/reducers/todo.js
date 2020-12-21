
const initialState={
    todos : [],
    Total : 0,
    Done : 0,
}
const todo = (state = initialState, action) => {
    let Total=state.Total;
    let Done = state.Done;
    let completed = true;
    switch (action.type) {
        case 'CREATE_TODO':
            // console.log(state);
            return {
                todos : [...state.todos,
                    {
                    id: action.id,
                    text: action.text,
                    completed: false,
                    color : "white",
                }],
                Total : Total+1,
                Done : Done,
            }
        case 'DELETE_TODO':
            // console.log(state,action);
            let tempState = state.todos.filter(todo => todo.text !== action.text);
            state.todos.map(todo=>{
                if(todo.text === action.text){
                    completed = todo.completed;
                }
            })
            return {
                todos : [...tempState],
                Total : Total-1,
                Done : completed ? Done-1 : Done,
            }
        case 'TOGGLE_TODO':
            return{
                todos : state.todos.map(todo =>
                {
                    if(todo.id===action.id){
                        completed=todo.completed;
                        if(todo.completed===false){
                            return {
                                id: todo.id,
                                text: todo.text,
                                completed: !todo.completed,
                                color : "lightgreen",
                            };
                        }
                        else{
                            return {
                                id: todo.id,
                                text: todo.text,
                                completed: !todo.completed,
                                color : "white",
                            };
                        }
                    }
                    else{
                        return{
                            id: todo.id,
                            text: todo.text,
                            completed: todo.completed,
                            color : todo.color,
                        }
                    }
                }),
                Total : Total,
                Done : completed ? Done-1 : Done+1,

            }


        default:
            return state
    }
}

export default todo;


// const todo = (state = [], action) => {
//     switch (action.type) {
//         case 'CREATE_TODO':
//             console.log(state);
//             return [
//                 ...state,
//                 {
//                     id: action.id,
//                     text: action.text,
//                     completed: false,
//                     color : "white",
//                 },
//             ]
//         case 'DELETE_TODO':
//             // console.log(state,action);
//             let tempState = state.filter(todo => todo.text !== action.text);
//             return [
//                 ...tempState,
//             ]
//         case 'TOGGLE_TODO':
//             // console.log(state);
//             return state.map(todo =>
//                 (todo.id === action.id)
//                     ? (todo.completed === false ?
//                     {
//                         id: todo.id,
//                         text: todo.text,
//                         completed: !todo.completed,
//                         color : "lightgreen",
//                     } :
//                         {
//                             id: todo.id,
//                             text: todo.text,
//                             completed: !todo.completed,
//                             color : "white",
//                         }
//                     ) : todo
//             )
//         default:
//             return state
//     }
// }
//
// export default todo;


