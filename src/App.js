import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from './Modal';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      users:[],
      displayModal: false,
      detail:''
    }

    this.getOurData = this.getOurData.bind(this);
    
  }
  componentWillMount(){
    this.getOurData();
  }

 getOurData(){
   fetch('https://jsonplaceholder.typicode.com/users').then(res => {
       return res.json();
     }
   ).then(j => {
      this.setState({ users: j });
    });
 }

  handleClick(user){
    console.log('clickity '+ user.company.name );
    this.setState({ detail: user, displayModal: true });
   }
  closeClick(){
    this.setState({ displayModal: false });
  }
  render() {
    
    const listItems = this.state.users.map((user) =>
      <button className='blist' key={user.id} onClick={this.handleClick.bind(this, user)}>{user.name}</button>
    );
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          { listItems }
        </p>  
        <Modal details={this.state.detail} showModa={this.state.displayModal} closeDetail={this.closeClick.bind(this)} />
      </div>
    );
  }
}

export default App;
