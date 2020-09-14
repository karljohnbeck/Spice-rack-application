import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SpiceList from '../SpiceList/SpiceList'
import { Link } from 'react-router-dom';


// material ui 
import { Typography, MenuItem, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

let hasCategory = false

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
    padding: '15px',
  },
  margin: {
    margin: '5px',
  },
};

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SPICELIST' })
    this.props.dispatch({ type: 'FETCH_CATEGORIES' })

  }

  state = {
    searchCriteria: '',
    categorySelected: 0,
    hasCategory: false,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  differentSearch = (event) => {
    this.setState({ searchCriteria: event.target.value })
    console.log(this.state)
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={32} className={classes.gridContainer} >
        {/* <Grid item xs={12}>

          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>

        </Grid> */}
        <Grid
          container
          spacing={16}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6}>
            <Card className={classes.pos}>
              <Typography
                align="center"
                justify="center"
                variant="h5"
                className={classes.margin}>
                Spice filter:
            </Typography>
              <TextField onChange={this.differentSearch} className={classes.margin} id="filled-basic" label="Search by name" variant="filled" />
              <br />
              <Select className={classes.margin}
                value={this.state.categorySelected}
                onChange={this.handleChange}
                inputProps={{
                  name: 'categorySelected',
                  id: 'category-simple',
                }}
              >
                <MenuItem value={0} >
                  All categories
                    </MenuItem>
                {this.props.store.uniqueCategories.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item.id} >
                      {String(item.name)}
                    </MenuItem>
                  )
                })}
              </Select>
            </Card>
            <br />

            <Card className={classes.pos}>
              <Typography
                align="center"
                justify="center"
                variant="h5"
                className={classes.margin}>
                Add a new spice
                        </Typography>
              <Button alignContent="center" justify="center" variant="outlined" component={Link} to='/addspice' className={classes.margin}>+ Add a spice</Button>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={16}
          align="center"
          justify="center"
        >
          {this.props.store.spiceList.filter((spice) => {

            (spice.cat_list.map((category) => { if (category === this.state.categorySelected) { hasCategory = true; console.log(hasCategory); return true } }))

            if (this.state.searchCriteria === '' && this.state.categorySelected === 0) {
              hasCategory = false;
              return spice
            }
            else if (
              spice.name.toLowerCase().includes(this.state.searchCriteria.toLowerCase()) && hasCategory === true
              ||
              spice.name.toLowerCase().includes(this.state.searchCriteria.toLowerCase()) && this.state.categorySelected === 0
              ||
              this.state.searchCriteria === '' && hasCategory === true
            ) {
              hasCategory = false;
              return spice
            }
          }).map((spice, i) => {

            return (
              <Grid
                className={classes.margin}
                key={i} item xs={8} xl={3}>
                <SpiceList spice={spice} />
              </Grid>

            )

          })}
        </Grid>

      </Grid>
    );
  }
}

// this allows us to use <App /> in index.js
const styleUserPage = withStyles(styles)(UserPage)


export default connect(mapStoreToProps)(styleUserPage);
