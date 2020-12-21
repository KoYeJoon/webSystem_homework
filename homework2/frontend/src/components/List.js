import React from 'react';
import ReviewCard from "./ReviewCard";
import "../App.css"


class List extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            reviews : this.props.data,
        }
    }

    deleteReviewById(id){
        // console.log(id);
        let tempState = this.state.reviews.filter(review => review._id !== id);
        this.setState({
            reviews : tempState,
        })
    }


    render(){
        if(this.props.data.length===0){
            return null;
        }
        else{
            return(
                <div>
                    <h2>Review List</h2>
                    <ul>
                    {this.state.reviews.map((review,index)=>
                        <li key={index}>
                <ReviewCard review = {review} onDelete={this.deleteReviewById.bind(this)}/>
                        </li>)}
                    </ul>
                </div>
            )

        }
    }
}

export default List;