import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';


export default function UserCard({user, deleteUser}){
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name='user outline'/> {user.firstName} {user.lastName}
        </Card.Header>
        <Card.Description>
          <p><Icon name='phone'/> {user.phone}</p>
          <p><Icon name='mail'/> {user.email}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/users/edit/${user._id}`} 
            className="ui basic button green">
              Edit
          </Link>
          <Button basic color="red" 
            onClick={() => deleteUser(user._id)} >
              Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};