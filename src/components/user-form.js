import React, { Component } from 'react';
import { Form, Grid, Button, FormField, Message } from 'semantic-ui-react';
import get from 'lodash/get';
import { Formik } from 'formik';
import * as Yup from 'yup';


const defaultFormShape = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
};

class UserForm extends Component {

  
  render() {
    
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),

      phone: Yup.string()
        .required('Please provide a phone'),

      name: Yup.object({
        firstName: Yup.string()
          .required('First name is required'),
      })
    })
    
    return (
      
      <Formik
        initialValues={this.props.user.firstName ? this.props.user : defaultFormShape}
        enableReinitialize
        validationSchema={validationSchema}

        onSubmit={(values) => {

          if(!values._id) {
            return this.props.saveUser(values)
          } else {
            return this.props.updateUser(values)
          }
        }}
        
        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
        <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{this.props.user._id ? 'Edit User' : 'Add New User'}</h1>
            
          <Form onSubmit={handleSubmit} loading={this.props.loading}>
            <Form.Group widths='equal'>
              <FormField>
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                  placeholder='First name'
                />
                {get(touched, 'firstName') && get(errors, 'firstName') && <Message negative size='mini'>{errors.firstName}</Message>}
                
              </FormField>   
              <FormField>
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </FormField>
            </Form.Group>

            <FormField>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {touched.phone && errors.phone && <Message negative size='mini'>{errors.phone}</Message>}

              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} 
              /> 
              {touched.email && errors.email && <Message negative size='mini'>{errors.email}</Message>}

            </FormField>
            <Button basic color='green' type='submit'>Save</Button>
            <Button basic color='red' onClick={this.props.cancelForm}>Cancel</Button>
          </Form>
        </Grid.Column>
      </Grid>
          
      )}
      />

    );
  };
};

export default UserForm;