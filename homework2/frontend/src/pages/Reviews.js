import React from 'react';
import request from "../lib/request";
import List from "../components/List";


class Reviews extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            reviews :[],
        }
    }

    async componentDidMount() {
        let res = await request.getReviews();
        this.setState({
            reviews : res,
        });
    }

    render(){
        const {reviews} = this.state;
        if(reviews.length===0){
            return null;
        }
        else{
            return(<List data = {this.state.reviews}    />);
        }
    }
}

export default Reviews;