import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class RecipeList extends Component {
  state = {
    heading: 'RecipeList Component',
    searchQuery: this.props.match.params.search
  };

  componentDidMount() {
    console.log(this.state.searchQuery)
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecipeList);