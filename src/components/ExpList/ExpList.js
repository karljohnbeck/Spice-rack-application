import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Overlay from '../EditSpiceOverlay/EditSpiceOverlay'
import DeleteDialog from '../DeleteDialog/DeleteDialog'

import { CardActions, CardContent, Typography, withStyles, Grid, Card, } from '@material-ui/core';

const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    padding: '10px',
    justifyContent: "center",
    margin: '10px'
  },
  cardAction: {
    display: 'inline-block',
    margin: '3px',
    textAlign: 'center',
  },
  titleBar: {
    marginTop: '-8px',
    backgroundColor: '#ffe2b6',
    width: '100%',
  },
  titleBarClose: {
    backgroundColor: '#ffe2b6',
    width: '100%',
  },
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ExpList extends Component {
  state = {
    heading: 'ExpList Component',
    // handles card flipping 
    isSpice: true
  };

  // handles card flipping 
  toggleState = () => {
    this.setState({
      isSpice: !this.state.isSpice
    })
  }

  // run the delete spice sage to remove the specific spice from the DB
  deleteSpice = (spice_id) => {
    this.props.dispatch({ type: 'DELETE_SPICE', payload: spice_id })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={32} className={classes.gridContainer} >
          <Grid
            container
            spacing={16}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <section align="center" justify="center" className={classes.titleBar}>

              <h2 >Expired spices</h2>
            </section>

            {/* Check all the spices on the spice list */}
            {this.props.store.spiceList.map((spice, i) => {
              let today = moment()
              let expDate = moment(spice.exp_date)
              let compare = (today.diff(expDate, 'days'))

              // IF the spice is passed is EXP date, display it here 
              if (compare > 0) {
                return (

                  <Card key={i} align="center" className={classes.card}>
                    <CardContent>
                      <Typography justify="center" variant="h4" component="h2">
                        {spice.name}
                        <br />
                      </Typography>
                      <br />
                      <Typography className={classes.cardPlus} component="h5">
                        Expired on: {moment(spice.exp_date).format('YYYY-MM-DD')}
                      </Typography>

                      {/* used the edit overlay to edit the spice */}
                      <CardActions className={classes.cardAction}>
                        <Overlay spice={spice} toggleState={this.toggleState} />
                      </CardActions >

                      {/* use the delete overlay to delete the spice */}
                      <CardActions className={classes.cardAction}>
                        <DeleteDialog toggleState={this.toggleState} spice={spice} />
                      </CardActions>
                    </CardContent>
                  </Card>
                )
              }
            })}
            <section align="center" justify="center" className={classes.titleBarClose}>

              <h2 >Close to expiring spices</h2>
            </section>

            {/* Loop again to look for expireing soon spices */}
            {this.props.store.spiceList.map((spice, i) => {
              let today = moment()
              let expDate = moment(spice.exp_date)

              // IF the spice is expiring in the next 30 days 
              if (today.diff(expDate, 'days') > -30 && today.diff(expDate, 'days') < 0) {
                return (
                  <Card key={i} align="center" onClick={this.toggleState} className={classes.card}>
                    <CardContent>
                      <Typography justify="center" variant="h5" component="h2">
                        {spice.name}
                        <br />
                      </Typography>

                      <br />

                      <Typography component="p">
                        Will expire on: {moment(spice.exp_date).format('YYYY-MM-DD')}
                        <br />
                        Only {expDate.diff(today, 'days')} days left!
                      </Typography>

                      {/* used the edit overlay to edit the spice */}
                      <CardActions className={classes.cardAction}>
                        <Overlay toggleState={this.toggleState} spice={spice} />
                      </CardActions >

                      {/* use the delete overlay to delete the spice */}
                      <CardActions className={classes.cardAction}>
                        <DeleteDialog toggleState={this.toggleState} spice={spice} />
                      </CardActions>

                    </CardContent>
                  </Card>
                )
              }
            })}
          </Grid>
        </Grid>
      </div>

    );
  }
}

const withRouterExpList = withRouter(ExpList)

const styleExpList = withStyles(styles)(withRouterExpList)

export default connect(mapStoreToProps)(styleExpList);