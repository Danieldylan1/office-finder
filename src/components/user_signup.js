import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { doUserSignup } from '../actions';
import { bindActionCreators } from 'redux';

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    };
  }
  onSubmit(fields) {
    console.log('user signup form submit - fields', fields);
    this.props.doUserSignup(fields, (data) => {
      console.log('callback from doUserSignup - data:', data);
      /*
      const bookingDetailUrl = `/booking/${data.docs[0]._id}/detail`;
      this.props.history.push(bookingDetailUrl);
      */
    });
  }
  renderInputField(field) {
    const { meta:{ touched, error } } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;
    return (
      <div className={className}>
        <label>{ field.label }</label>
        <input
          { ...field.input }
          className="form-control"
          type={ field.type }
          placeholder={ field.placeholder }
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-md-6">
        <br/>
        <h4>User Signup</h4>
        <hr/>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="email"
            label="Email"
            type="text"
            placeholder=""
            component={ this.renderInputField }
          />
          <Field
            name="password"
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            component={ this.renderInputField }
          />
          <Field
            name="invite_code"
            label="Invite Code"
            type="password"
            placeholder=""
            component={ this.renderInputField }
          />
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
        <br/>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Enter username';
  }
  if (!values.password) {
    errors.password = 'Enter password';
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Password is too short';
  }
  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doUserSignup }, dispatch);
}

export default reduxForm({
  form:'userSignup',
  validate: validate
})(
  connect(null, mapDispatchToProps)(UserSignup)
);
