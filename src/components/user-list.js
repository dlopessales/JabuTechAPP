import React from 'react';
import { Card } from 'semantic-ui-react';
import UserCard from './user-card';

export default function UserList({users, deleteUser}){

  const cards = () => {
    return users.map(user => {
      return (
        <UserCard key={user._id} 
        user={user} 
          deleteUser={deleteUser}/>
      );
    });
  };
  return (
    <Card.Group>
      { cards() }
    </Card.Group>
  );
};