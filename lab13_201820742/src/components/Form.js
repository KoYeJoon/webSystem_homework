import React from "react";
import { connect } from 'react-redux';
import {createTodo} from "../actions/todo";


class Form extends React.Component{
    //사용자의 Todo를 입력받아 추가하는 Component

    render(){
        let input;
        const {handleCreateTodo} = this.props;

        return(
            <div>
                    <input ref={node => input = node} />
                    <button onClick={()=>handleCreateTodo(input)}>
                        OK
                    </button>
            </div>
        )
    }
}



const mapDispatchProps = (dispatch) => {
    return {
        handleCreateTodo(input){
            if (!input.value.trim()) {
                return
            }
            dispatch(createTodo(input.value))
            input.value = ''
        },
    };
};


export default connect(null,mapDispatchProps)(Form);