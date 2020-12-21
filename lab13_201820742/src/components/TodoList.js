import React from "react";
import Form from "./Form";
import List from "./List";
import {connect} from 'react-redux';

class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Total : 0,
            Done : 0,
        }
    }



    render(){
        return(
            <div>
                <h3>TodoList</h3>
                <span>Total :{this.props.Total} Done :{this.props.Done}</span>
                <Form />
                <List />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        Total : state.todo.Total,
        Done : state.todo.Done,
    };
};


export default connect(mapStateToProps,null)(TodoList);