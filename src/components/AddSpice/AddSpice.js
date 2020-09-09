import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

// material ui 
import { InputLabel, MenuItem, Input, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    minHeight: '200px',
    maxHeight: '200px',

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
class AddSpice extends Component {
  state = {
    heading: 'AddSpice Component',
    categoryList: [],
    list: []
  };

  componentDidMount() {
    let list = []
    {
      this.props.store.categoriesList.map((category, i) => {
        list.push(category.name)
        console.log(list)
      })
    }
    let newList = [...new Set(list)]
    this.setState({ categoryList: newList })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  dateChange = event => {
    console.log(event.target.value)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <Grid container spacing={32} className={classes.gridContainer} >

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={5}>
              <Card >
                <TextField className={classes.margin} id="filled-basic" label="Spice name" variant="filled" />
                <Input type='Date' className={classes.margin}
                  variant="outlined" 
                  onChange={this.dateChange}/>
                <br />
                {/* Needs to be multi select eventually */}
                <InputLabel className={classes.margin} htmlFor="category-simple">Categories</InputLabel>

                <Select
                  className={classes.margin}
                  value={this.state.list}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'list',
                    id: 'category-simple',
                }}
                  multiple>
                  {this.state.categoryList.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item} >
                        {String(item)}
                      </MenuItem>
                    )
                  })}
                </Select>
                <br />
                <Button className={classes.margin}>Cancel</Button>

                <Button className={classes.margin}>Add Spice</Button>

              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styleAddSpice = withStyles(styles)(AddSpice)


export default connect(mapStoreToProps)(styleAddSpice);