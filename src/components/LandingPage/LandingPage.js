import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Welcome to Spice-rack',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <>
      <center>
        <h2>{this.state.heading}</h2>

        <h3>Keep track of all your spices!</h3>
        </center>
          
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
       
        </>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
