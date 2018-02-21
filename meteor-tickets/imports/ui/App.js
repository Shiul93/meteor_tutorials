
import React, { Component } from 'react';
 
import Ticket from './Ticket.js';
import { withTracker } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

 
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
    if(textName != ""){
        Tickets.insert({
            name:textName,
            description:textDescription,
            createdAt: new Date(), // current time
          });
       
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
        </header>

        <form className="new-ticket" onSubmit={this.handleSubmit.bind(this)} >
        
            <input
              type="text"
              ref="textInputName"
              placeholder="Name of the incidence"
            />
            <br></br>
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

        <ul>

          {this.renderTickets()}
        </ul>
      </div>
    );
  }

  
}
export default withTracker(() => {
    return {
        tickets: Tickets.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
  })(App);