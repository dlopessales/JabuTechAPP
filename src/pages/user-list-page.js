import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserList from '../components/user-list';


class UserListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  };
  
  render(){
    return (
      <div>
        <h1>List of users</h1>
        <UserList 
          users={this.props.users} 
          deleteUser={this.props.deleteUser} />
      </div>
    );
  };
};


const mapStateToProps = state => 
  ({
    users: state.user.users
  });

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: dispatch.user.fetchUsers,
  deleteUser: dispatch.user.deleteUser
})
export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
