import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SpiceList from '../SpiceList/SpiceList'
import { Link } from 'react-router-dom';


// material ui 
import { MenuItem, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';

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

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SPICELIST' })
    this.props.dispatch({ type: 'FETCH_CATEGORIES' })

  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={32} className={classes.gridContainer} >
        <Grid item xs={12}>

          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>

        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={5}>
            <Card >
              <TextField className={classes.margin} id="filled-basic" label="title" variant="filled" />
              <br />
              <Button component={Link} to='/addspice' className={classes.margin}>+ Add a spice</Button>
              {/* Needs to be multi select eventually */}
              <Select className={classes.margin}
                value={[]}
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
            </Card>
          </Grid>
        </Grid>

        {this.props.store.spiceList.map((spice, i) => {
          return (
            <Grid key={i} item xs={6}>
              <SpiceList spice={spice.name} spiceId={spice.id} />
            </Grid>
          )
        })}

      </Grid>
    );
  }
}

// this allows us to use <App /> in index.js
const styleUserPage = withStyles(styles)(UserPage)


export default connect(mapStoreToProps)(styleUserPage);
