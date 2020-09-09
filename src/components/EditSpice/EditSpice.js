import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EditSpice extends Component {
  state = {
    heading: 'EditSpice Component',
    EditSpice: {}
  };

  

  componentDidMount() {
    let id = this.props.match.params.spice_id
    console.log(id)
    this.props.dispatch({type: 'STORE_CLICKED_SPICE', payload: id})
    
  }

  



  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  
  }
}

const EditSpiceWithRouter = withRouter(EditSpice)

export default connect(mapStoreToProps)(EditSpiceWithRouter);