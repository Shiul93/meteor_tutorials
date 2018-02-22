
import React, { Component } from 'react';
 
import Ticket from './Ticket.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import { withTracker } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import { Tickets } from '../api/tickets.js';



 
// App component - represents the whole app
class App extends Component {
  
 
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
      Meteor.call('tickets.insert', textName, textDescription);

       
          // Clear form
      ReactDOM.findDOMNode(this.refs.textInputName).value = '';
      ReactDOM.findDOMNode(this.refs.textInputDescription).value = '';
    }
    

  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Ticketron 2018</h1>
          <AccountsUIWrapper />
        </header>
        { this.props.currentUser ?
        <div className="ticketForm">
          <form className="new-ticket" onSubmit={this.handleSubmit.bind(this)} >
          
              <input 
                type="text"
                ref="textInputName"
                placeholder="Name of the incidence"
              />
              <input
                type="text"
                ref="textInputDescription"
                placeholder="Description of the incidence"
              />
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