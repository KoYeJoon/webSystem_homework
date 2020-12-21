import React from 'react';
import request from "../lib/request";
import {stars} from "../lib/star";
import "../App.css"

class ReviewCard extends React.Component{
    async deleteReview(){
        await request.deleteReview({id:this.props.review._id});
        this.props.onDelete(this.props.review._id);
    }

    render(){
        const {review} = this.props;
        return(
                <div className={"review"}>
                    <p className={"review"}>Rate({stars(review.rate)})</p>
                    <h2 className={"content"}>{review.movie_name}</h2>
                    <p className={"content"} >{review.review_content}</p>
                    <button className={"review"} onClick={this.deleteReview.bind(this)}>Delete</button>
                </div>
        )
    }
}

export default ReviewCard;