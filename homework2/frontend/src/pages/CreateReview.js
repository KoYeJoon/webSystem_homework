import React from 'react';
import Form from "../components/Form";
import request from "../lib/request"


class CreateReview extends React.Component{
    render(){
        return(
            <Form onSubmit={request.createReview}/>
        )
    }
}

export default CreateReview;