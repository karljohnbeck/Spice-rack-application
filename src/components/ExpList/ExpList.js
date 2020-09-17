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
  cardPlus: {
    borderColor: '#EE856D',
    border: '1px',
  },
  cardAction: {
    display: 'inline-block',
    margin: '3px',
    textAlign: 'center',
  },
 
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ExpList extends Component {
  state = {
    heading: 'ExpList Component',
    isSpice: true

  };

  toggleState = () => {
    this.setState({
      isSpice: !this.state.isSpice
    })
  }

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
            <h2 >Expired Spices</h2>
            {this.props.store.spiceList.map((spice, i) => {
              let today = moment()
              let expDate = moment(spice.exp_date)
              let compare = (today.diff(expDate, 'days'))
              console.log(today)
              console.log(expDate)
              console.log(expDate.diff(today, 'days'))
              if (compare > 0) {
                return (

                  <Card key={i} align="center" className={classes.card}>
                    <CardContent>
                      <Typography justify="center" variant="h5" component="h2">
                        {spice.name}
                        <br />
                      </Typography>
                      <br />
                      <Typography className={classes.cardPlus} border={1} component="h6">
                        Expired on: {moment(spice.exp_date).format('YYYY-MM-DD')}
                      </Typography>

                      <CardActions className={classes.cardAction}>
                        {/* <Button onClick={this.editingSpice} component={Link} to={'/editspice/' + spice_id} size="small">Edit Spice</Button> */}
                        <Overlay spice={spice} toggleState={this.toggleState} />
                        {/* <Button onClick={() => this.props.history.push('/editspice/' + spice_id)} size="small">Edit Spice</Button> */}
                      </CardActions >

                      <CardActions className={classes.cardAction}>
                      <DeleteDialog toggleState={this.toggleState} spice={spice}/>

                        {/* <Button className={classes.button} onClick={() => this.deleteSpice(spice.id)} variant="outlined" color="primary" >Delete</Button> */}
                      </CardActions>


                    </CardContent>
                  </Card>
                )
              } 
            })}
              
              <h2 >Close to expiring spices</h2>
            {this.props.store.spiceList.map((spice, i) => {
              let today = moment()
              let expDate = moment(spice.exp_date)
              console.log(today)
              console.log(expDate)
              console.log(expDate.diff(today, 'days'))
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

                      <CardActions className={classes.cardAction}>
                        <Overlay toggleState={this.toggleState} spice={spice} />
                      </CardActions >
                      <CardActions className={classes.cardAction}>

                      <DeleteDialog toggleState={this.toggleState} spice={spice}/>
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