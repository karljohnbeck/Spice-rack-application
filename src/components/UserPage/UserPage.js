import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SpiceList from '../SpiceList/SpiceList'
import { Link } from 'react-router-dom';

// material ui 
import { Typography, MenuItem, withStyles, Grid, Select, Button, Card, TextField, FormControl, Input } from '@material-ui/core';

// used for the search filter on the page
let hasCategory = false

const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    maxHeight: '200px',
  },
  margin: {
    margin: '5px',
  },
  filterBar: {
    backgroundColor: '#ffe2b6',
    marginTop: '-30px'
  },
  searchWidth: {
    width: 350,
    marginLeft: '-12px'
    // backgroundColor: 'white',
  },
  select: {
    backgroundColor: 'white',
    margin: '5px',
    width: 350,
  },
  greyButton: {
    margin: '10px',
    backgroundColor: "#6e7e85",
    color: 'white'
  },
  filter: {
    marginTop: '15px',

  }
};

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  // on load, get the spice list and categories
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SPICELIST' })
    this.props.dispatch({ type: 'FETCH_CATEGORIES' })

  }

  state = {
    searchCriteria: '',
    categorySelected: 0,
    // used for the search filter
    hasCategory: false,
  }

  // handle select values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // handle the input change
  differentSearch = (event) => {
    this.setState({ searchCriteria: event.target.value })
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <section align="center"
          justify="center" className={classes.filterBar}>

          <h3 className={classes.filter}>Spice filter</h3>

          {/* search by input field */}
          <TextField   className={classes.select} onChange={this.differentSearch} id="filled-basic" label="Search by name" />

          <br />
          {/* Search by the categories */}
          <FormControl className={classes.searchWidth} variant="outlined">

            <Select className={classes.select}

              value={this.state.categorySelected}
              onChange={this.handleChange}
              autoComplete='off'
              inputProps={{
                name: 'categorySelected',
                id: 'category-simple',
              }}
            >
              <MenuItem value={0} >
                All categories
                    </MenuItem>
              {/* loop over all the categories possible */}
              {this.props.store.uniqueCategories.map((item, i) => {
                return (
                  <MenuItem key={i} value={item.id} >
                    {String(item.name)}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <br />
          <br />

        </section>
        <Grid
          container
          spacing={16}
          className={classes.gridContainer}
          align="center"
          justify="center" >

          <Grid border={1} item xs={10} xl={12}>

            <br />

            {/* card for allowing more spices to be added */}
            <Card className={classes.card}>
              <Typography
                align="center"
                justify="center"
                variant="h5"
                className={classes.margin}>
                Add a new spice
                        </Typography>
              <Button align="center" justify="center" variant="outlined" component={Link} to='/addspice' className={classes.greyButton}>+ Add a spice</Button>
            </Card>
          </Grid>
          <br />
          <Grid
            container
            spacing={16}
            align="center"
            justify="center"
          >

            {/* Below is a large monster of a code section, 
              it loops over a few things to make the search bars work */}
            {/* Start by looping over the spicelist reducer */}
            {this.props.store.spiceList.filter((spice) => {

              // loop over the categorys on each spice in the spice list
              (spice.cat_list.map((category) => { if (category === this.state.categorySelected) { hasCategory = true; console.log(hasCategory); return true } }))

              // if no input is typed and no category is selected, return all the spices
              if (this.state.searchCriteria === '' && this.state.categorySelected === 0) {
                hasCategory = false;
                return spice
              }

              // based on input/select values return those spicific spices
              else if (
                // checks if BOTH input and category selected is true
                spice.name.toLowerCase().includes(this.state.searchCriteria.toLowerCase()) && hasCategory === true
                ||
                // checks input is filled out AND select is empty
                spice.name.toLowerCase().includes(this.state.searchCriteria.toLowerCase()) && this.state.categorySelected === 0
                ||
                // checks if select is filled out AND input is empty
                this.state.searchCriteria === '' && hasCategory === true
              ) {
                hasCategory = false;
                return spice
              }
              // after all returns, loop those over and display them on the dom
            }).map((spice, i) => {

              return (
                <Grid
                  className={classes.margin}
                  key={i} item xs={10} xl={3}>
                  {/* each individual spice card */}
                  <SpiceList spice={spice} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </>
    );
  }
}

// this allows us to use <App /> in index.js
const styleUserPage = withStyles(styles)(UserPage)

export default connect(mapStoreToProps)(styleUserPage);
