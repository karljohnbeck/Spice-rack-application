import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

// material ui 
import { InputLabel, MenuItem, Input, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

import AddSpiceDialog from '../AddSpiceDialog/AddSpiceDialog'

const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  margin: {
    margin: '15px'
  },
  titleBar: {
    backgroundColor: '#ffe2b6',
    width: '100%',
  },
  button: {
    width: '80px',
    height: '60px',
    backgroundColor: "#6e7e85",
    color: 'white',
    display: 'flex',
  },
  buttonZone: {
    display: 'flex',
  },
  cancel: {
    width: '80px',
    height: '60px',
    backgroundColor: "#6e7e85",
    color: 'white',
    float: 'left',
    margin: '15px'
  }
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AddSpice extends Component {
  state = {
    heading: 'AddSpice Component',
    name: '',
    exp_date: null,
    categoryList: [],
    list: [],
  };

  // handle input changes
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  autoFill = () => {
    this.setState({
      name: 'Oregano',
      exp_date: '2021-08-22',
      list: [35, 33], 
  })
}

// dispatched to addSpice saga
  addSpice = () => {
    this.props.dispatch({
      type: 'ADD_SPICE',
      payload: {
        name: this.state.name,
        exp_date: this.state.exp_date,
        categories_id: this.state.list,
      }})}
  // reset inputs
  clearState = () => {
    this.setState({
      name: '',
      exp_date: undefined,
      list: [],
    })}

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid alignItems="center" justify="center" container spacing={32} className={classes.gridContainer} >
          <Grid
            container
            spacing={32}
            alignItems="center"
            justify="center"
          >
            <section align="center" justify="center" className={classes.titleBar}>
              <h2

              // delete this later
               onClick={this.autoFill}

               >Add a new spice</h2>
            </section>

            <Grid align="center" item xl={12} xs={10}>
              <form>
                <Card xs={12} >
                  {/* name input */}
                  <TextField
                    onChange={this.handleChange}
                    value={this.state.name}
                    className={classes.margin}
                    id="spice-name"
                    label="Spice name"
                    required
                    inputProps={{
                      name: 'name',
                      id: 'spice-name',
                    }} />
                  <br />
                  {/* date input */}
                  <Input type='Date'
                    className={classes.margin}
                    value={this.state.exp_date || ''}
                    onChange={this.handleChange}
                    variant="outlined"
                    id="exp-date"
                    inputProps={{
                      name: 'exp_date',
                      id: 'exp-date',
                    }}
                  />
                  <br />
                  {/* allows multiple spices to be selected */}
                  <InputLabel className={classes.margin} htmlFor="category-simple">Categories</InputLabel>
                  <br />
                  <Select
                    className={classes.margin}
                    value={this.state.list}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'list',
                      id: 'category-simple',
                    }}
                    multiple>
                    {this.props.store.uniqueCategories.map((item, i) => {
                      return (
                        <MenuItem key={i} value={item.id} >
                          {String(item.name)}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <br />

                  <div className={classes.buttonZone} >
                    {/* back sends you home */}
                    <Button component={Link} to='/user' className={classes.cancel} >Back</Button>
                  {/* opens up the dialog after shipping the spice to the db */}
                    <AddSpiceDialog stateCheck={this.state.name} addSpice={this.addSpice} clearState={this.clearState} />
                  </div>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styleAddSpice = withStyles(styles)(AddSpice)


export default connect(mapStoreToProps)(styleAddSpice);