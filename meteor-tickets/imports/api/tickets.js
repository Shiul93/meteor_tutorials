import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tickets = new Mongo.Collection('tickets');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tickets', function ticketsPublication() {
    if (Meteor.user() != null){
        if (Meteor.users.findOne(this.userId).username == "admin"){
            return Tickets.find();
        }else{
            return Tickets.find({
                
                
                owner: this.userId 
            
            });
        }
    }
    
    });

    
    
  }

Meteor.methods({
    'tickets.insert'(name, description) {
      check(name, String);
      check(description, String);

   
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
   
      Tickets.insert({
        name,
        description,
        createdAt: new Date(),
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,
        responses:"",
      });
    },
    'tickets.remove'(ticketId) {
      check(ticketId, String);
   
      Tickets.remove(ticketId);
    },
    'tickets.addResponse'(ticketId, response) {
      check(ticketId, String);
   
      Tickets.update(ticketId, {$set:  { responses: response } });
    },
  });