import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            flag : false,
        }
    }

  //input value 업데이트
    updateNewTextValue = (event)=>{
        this.setState({name : event.target.value});
    }

  //button 클릭 함수
    changeFlag=(e)=>{
        e.preventDefault();
        this.setState({flag : true});
    }



  render(){
        if(this.state.flag===false){
            return(
                <div className="App">
                    <header className="App-header">
                        <form>
                            <h1>Who are you?</h1>
                            <input value={this.state.name} onChange={this.updateNewTextValue} />
                            <br/>
                            <button onClick={this.changeFlag}>OK</button>
                        </form>
                    </header>
                </div>
            );
        }
        else{
            return(
                <div className="App">
                    <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Hello, {this.state.name}!</p>
                    </header>
                </div>
            );
        }


  }

}

export default App;
