
import React, { Component } from 'react';
 
import Ticket from './Ticket.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import { withTracker } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import { Tickets } from '../api/tickets.js';

import Dropzone from 'react-dropzone'




 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
        showResponse: undefined,
        photo:"",
      };

  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log("Accepted"+acceptedFiles);
    console.log("Rejected"+rejectedFiles);
    var file = acceptedFiles[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      data = event.target.result;
      //console.log(data);

    this.onPhoto(data);
    };
    reader.readAsDataURL(file);

    
    
    

  }
  
 
  renderTickets() {
    return this.props.tickets.map((ticket) => (
      <Ticket key={ticket._id} ticket={ticket} />
    ));
  }
 
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const textName = ReactDOM.findDOMNode(this.refs.textInputName).value.trim();
    const textDescription = ReactDOM.findDOMNode(this.refs.textInputDescription).value.trim();
    if((textName != "") && (textDescription != "")){
      Meteor.call('tickets.insert', textName, textDescription, this.state.photo);

       
          // Clear form
      ReactDOM.findDOMNode(this.refs.textInputName).value = '';
      ReactDOM.findDOMNode(this.refs.textInputDescription).value = '';
      this.setState({
        photo:"",
      });
    }
    

  }


  onPhoto(data){
    this.setState({
      photo:data,
    }
    );

   // Tracker.flush();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Ticketron 2018</h1>
          <AccountsUIWrapper />
        </header>
        { this.props.currentUser ?
        <div className="ticketForm" align="center">
        
          <form className="new-ticket" onSubmit={this.handleSubmit.bind(this)} >
          
              <input className = "ticketTextBox"
                type="text"
                ref="textInputName"
                placeholder="Name of the incidence"
              />
              <input className = "ticketTextBox"
                type="text"
                ref="textInputDescription"
                placeholder="Description of the incidence"
              />
              {this.state.photo == ""?
              <div className="dropzone" align="center">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                  <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
              </div>:<img src={this.state.photo} />
              }
              <button type = "submit" className = "submit-button">
              
                Submit 
              </button>   
              
          </form>
          <br></br>       

          

        </div>: ''
        }
        

        


          <ul>
            {this.renderTickets()}
          </ul>
      </div>
    );
  }

  
}
export default withTracker(() => {
  Meteor.subscribe('tickets');

    return {
        tickets: Tickets.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(App);