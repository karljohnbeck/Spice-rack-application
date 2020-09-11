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
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Categories extends Component {
  state = {
    heading: 'Categories Component',
  };

  render() {
    const { classes } = this.props;
    return (

      <div>
        <Grid container spacing={32} className={classes.gridContainer} >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={5} align="center">
              <Card className={classes.card} >
                <TextField onChange={this.handleChange}
                  className={classes.margin}
                  id="spice-name"
                  label="Spice name"
                  inputProps={{
                    name: 'name',
                    id: 'spice-name',
                  }} />

                <Button component={Link} to='/user' className={classes.margin}>Cancel</Button>

                <Button onClick={console.log('woo')} className={classes.margin}>Add Spice</Button>

              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const withStyleCategories = withStyles(styles)(Categories)

export default connect(mapStoreToProps)(withStyleCategories);