import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import UserForm from '../components/user-form';




class UserFormPage extends Component{

  


  componentDidMount = () => {
    const { _id } = this.props.match.params;
    if (_id) {
      this.props.fetchUser(_id);
    }else{
      this.props.newUser()
    }
  };
  

  render() {
    return (
      <div>
        {
          this.props.redirect ?
          <Redirect to='/' /> :
          <UserForm 
            user={this.props.user} 
            loading={this.props.user.loading} 
            saveUser={this.props.saveUser}
            updateUser={this.props.updateUser}
            onSubmit={this.submit}
            errors={this.props.errors}
            redirect={this.props.redirect}
            cancelForm={this.props.cancelForm}
            />
        }
      </div>
    );
  };
};


const mapStateToProps = state => ({
  user: state.user.user, 
  errors: state.user.errors,
  redirect: state.user.redirect
});

const mapDispatchToProps = (dispatch) => ({
  saveUser: dispatch.user.saveUser,
  fetchUser: dispatch.user.fetchUser,
  updateUser: dispatch.user.updateUser,
  newUser: dispatch.user.newUser,
  cancelForm: dispatch.user.cancelForm
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFormPage);