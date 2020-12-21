import React from 'react';
import {Link} from "react-router-dom";
import '../App.css'

class Header extends React.Component{
    render(){
        return(
            <div className={"header"}>
            <h2 className={"header"}>Homework2-201820742</h2>
            <Link className={"header"} to={"/"}>Home</Link>
            <Link className={"header"} to={"/review/new"}>New</Link>
            </div>
        );
    }
}

export default Header;