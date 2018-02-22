import React, { Component } from 'react';
import { Tickets } from '../api/tickets.js';
import { Meteor } from 'meteor/meteor';


// Task component - represents a single todo item
export default class Ticket extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            showResponse: false,
          };

      }
    deleteThisTicket() {
        Meteor.call("tickets.remove",this.props.ticket._id);
    }

    toggleResponse() {
            this.setState({
                showResponse: !this.state.showResponse,
              });
            console.log(this.state.showResponse);

           }

    activateResponse() {
    this.setState({
        showResponse: true,
        });

    }
    
    deactivateResponse() {
    this.setState({
        showResponse: false,
        });

    }

    handleSubmit(){
        const response = ReactDOM.findDOMNode(this.refs.textInputResponse).value.trim();
        Meteor.call('tickets.addResponse',this.props.ticket._id, response);
    }

    
    
  render() {
    return (
        <li >
        <div className = "incidence" onMouseEnter={this.activateResponse.bind(this)} onMouseLeave={this.deactivateResponse.bind(this)}>
            <button className="delete" onClick={this.deleteThisTicket.bind(this)}>
            &times;
            </button>
            <strong>{this.props.ticket.username} >>> {this.props.ticket.name}:</strong>
            <p>Description: <br></br> {this.props.ticket.description}</p>
            {this.state.showResponse && 
            <div className="responseForm">
            <form className="new-response" onSubmit={this.handleSubmit.bind(this)} >
            
                <input
                  type="text"
                  ref="textInputResponse"
                  placeholder="Response"
                />
                <br></br>          
   
            </form>
            <br></br>
  
          </div>
            }
        </div>
            
        </li>
    );
  }
}