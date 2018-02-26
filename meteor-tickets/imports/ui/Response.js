import React, { Component } from 'react';
import { Tickets } from '../api/tickets.js';
import { Meteor } from 'meteor/meteor';

export default class Response extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            owner: props.owner,
            text: props.text,
            username: props.username

         }
    }
    render(){
        return(
            <p> <strong>{this.state.username}</strong> : {this.state.text} </p>
        );
    }
}
