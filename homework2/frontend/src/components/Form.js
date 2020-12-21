import React from 'react';
import { withRouter } from 'react-router-dom';
import "../App.css";

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.form={
            movie_name : React.createRef(),
            review_content : React.createRef(),
            rate : React.createRef(),
        }
    }

    async submit(){
        const movie_name = this.form.movie_name.current.value;
        const review_content = this.form.review_content.current.value;
        const rate = parseInt(this.form.rate.current.value);

        await this.props.onSubmit({movie_name : movie_name, review_content : review_content, rate : rate});
        this.props.history.push("/");

    }

   cancel(){
        this.props.history.goBack();
    }

    render(){
        return(
            <div className={"createMovie"}>
                <h2 className={"createMovie"}>Movie Review</h2>
            <form className={"createMovie"}>
                <div className={"createField"}>
                <label className={"createMovie"} >I'm gonna review</label>
                <input className={"createMovie"} type="text" name="movie_name" ref={this.form.movie_name} placeholder={"Movie Name"}/>
                </div>
                <div className={"createField"}>
                <label className={"createMovie"} >My Review is</label>
                <input className={"createMovie"}  type="text" name="review_content" ref={this.form.review_content} placeholder={"Review"}/>
                </div>
                <div className={"createField"}>
                <label className={"createMovie"} >So, I'll give this movie a rating of</label>
                <input className={"createMovie"} type="text" name="rate" ref={this.form.rate} placeholder={"Rating"}/>
                </div>
            </form>
                <button className={"createMovie"} onClick = {this.submit.bind(this)}>OK</button>
                <button className={"createMovie"} onClick = {this.cancel.bind(this)}>Cancel</button>
            </div>
        )
    }

}

export default withRouter(Form);