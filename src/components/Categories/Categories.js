import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import { Link } from 'react-router-dom';
import EditCategory from '../EditCategory/EditCategory'

// material ui 
import { Typography, InputLabel, MenuItem, Input, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {

    minWidth: '400px'
  },
  cardAction: {
    backgroundColor: 'yellow',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: '15px'
  },
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Categories extends Component {
  state = {
    heading: 'Categories Component',
    isEdit: true,
    name:  "",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addCategory = () => {
    if (this.state.name === "") {
      alert('no')
    } else {
    this.props.dispatch({type: 'POST_CATEGORY', payload: this.state})
    this.setState({name: ''})
  }
  }

  render() {
    const { classes } = this.props;
    return (

      <div>
        <Grid justify="center" container spacing={32} className={classes.gridContainer} >
        <Grid
          container
          spacing={12}
          direction="column"
          alignItems="center"
          justify="center"
        >
            <Grid item xs={12} align="center">
              <Card className={classes.card} >
                <Typography variant="h5" component="h2">
                  Add a category
                </Typography>
                <TextField onChange={this.handleChange}
                variant="filled"
                  className={classes.margin}
                  id="spice-name"
                  label="Category name"
                  value={this.state.name}
                  inputProps={{
                    name: 'name',
                    id: 'spice-name',
                  }} />
                <br />
                <Button variant="outlined" component={Link} to='/user' className={classes.margin}>Cancel</Button>
                <Button variant="outlined" onClick={this.addCategory} className={classes.margin}>Add Category</Button>
              </Card>

              <h2>Manage Categories</h2>
              {this.props.store.uniqueCategories.map((category, i) => {
                return (
                  <div key={i}>
                  <br />
                  <EditCategory  category={category} />
                  </ div>
                )
              })}

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const withStyleCategories = withStyles(styles)(Categories)

export default connect(mapStoreToProps)(withStyleCategories);