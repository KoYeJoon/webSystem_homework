import React from "react";
import {connect} from 'react-redux';
import { toggleTodo, deleteTodo} from "../actions/todo";


class List extends React.Component{
    //사용자의 Todo를 입력받아 추가하는 Component
    render(){
        const {todos,handleDeleteTodo, handleToggleTodo} = this.props;
        // console.log(todos);
        return(
                <ul>
                    {todos.map((todo,index) =>
                    {
                        return(
                            <li key={index} style={{backgroundColor : `${todo.color}`}}>
                              <span>
                                {todo.text}
                                  <br />
                            <button onClick={() => handleToggleTodo(todo.id)} >완료</button>
                            <button onClick={() => handleDeleteTodo(todo.text)}>삭제</button>
                              </span>
                            </li>
                        )
                    }
                    )}
                </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos : state.todo.todos
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        handleDeleteTodo(text){
            // console.log(text);
            dispatch(deleteTodo(text))
        },
        handleToggleTodo(id){
            // console.log(id);
            dispatch(toggleTodo(id))
        },
    };
};

export default connect(mapStateToProps,mapDispatchProps)(List);