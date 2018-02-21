import React, { Component } from 'react';
import { Tickets } from '../api/tickets.js';


// Task component - represents a single todo item
export default class Ticket extends Component {
    deleteThisTicket() {
        Tickets.remove(this.props.ticket._id);
    }
    
  render() {
    return (
        <li >
        <div className = "incidence">
            <button className="delete" onClick={this.deleteThisTicket.bind(this)}>
            &times;
            </button>
            <h2>{this.props.ticket.name}:</h2>
            <p>Description: <br></br> {this.props.ticket.description}</p>
        </div>
            
        </li>
    );
  }
}