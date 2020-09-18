import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

// material ui 
import { Typography, InputLabel, MenuItem, Input, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

import AddSpiceDialog from '../AddSpiceDialog/AddSpiceDialog'
const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    minHeight: '300px',
    maxHeight: '300px',
    minWidth: '300px'
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
  titleBar: {
    backgroundColor: '#ffe2b6',
    width: '100%',
  },
  button: {
    width: '80px',
    height: '60px',
    backgroundColor: "#6e7e85",
    color: 'white'
  },
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  dateChange = event => {
    console.log(event.target.value)
  }

  addSpice = () => {
    this.props.dispatch({
      type: 'ADD_SPICE',
      payload: {
        name: this.state.name,
        exp_date: this.state.exp_date,
        categories_id: this.state.list,
      }
    })
  }
  clearState = () => {
    this.setState({
      name: '',
      exp_date: undefined,
      list: [],
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        <Grid alignItems="center" justify="center" container spacing={32} className={classes.gridContainer} >

          <Grid
            container
            spacing={32}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <section align="center" justify="center" className={classes.titleBar}>
              <h2 >Add a new spice</h2>
            </section>

            <Grid align="center" item xl={12} xs={12}>
              <form>
                <Card xs={12} >
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
                  {/* Needs to be multi select eventually */}
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
                  <Button component={Link} to='/user' className={classes.button} >Cancel</Button>

                  {/* <Button onClick={this.addSpice} className={classes.margin}>Add Spice</Button> */}
                  <AddSpiceDialog stateCheck={this.state.name} addSpice={this.addSpice} clearState={this.clearState} />

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