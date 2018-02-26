import React, { Component } from 'react';
import { Tickets } from '../api/tickets.js';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import Response from './Response.js';



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

    handleSubmit(event){
        event.preventDefault();

        const response = ReactDOM.findDOMNode(this.refs.textInputResponse).value.trim();
        const id = Meteor.userId();
        rep = this.createResponse(id, response);
        console.log(rep);
        Meteor.call('tickets.addResponse',this.props.ticket._id,rep );
        ReactDOM.findDOMNode(this.refs.textInputResponse).value = '';

    }

    createResponse(own, txt){
        console.log(this.props.ticket.responses.length);
        key = this.props.ticket.responses.length
        console.log(Meteor.users.findOne(this.userId));
        resp = {};
        resp["key"]=key;
        resp["owner"]=own;
        resp["text"]=txt;
        resp["username"]= Meteor.users.findOne(own).username;



        return (resp);
    }

  renderResponse(){

    return this.props.ticket.responses.map((response) => (
        <Response key={response.key} username={response.username} owner={response.owner} text={response.text}/>
      ));
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
            <br></br>
            { this.props.ticket.responses.length > 0?
            <div>
                {this.renderResponse()}
            </div>:""
            }
            {this.state.showResponse && 
            <div className="responseForm">
            <form className="new-response" onSubmit={this.handleSubmit.bind(this)} >
            
                <input
                  type="text"
                  ref="textInputResponse"
                  placeholder="Add Response"
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