import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';


import Overlay from '../EditSpiceOverlay/EditSpiceOverlay'
import DeleteDialog from '../DeleteDialog/DeleteDialog'


import { CardActions, CardContent, Typography, MenuItem, withStyles, Grid, Select, Button, Card, TextField } from '@material-ui/core';


const styles = {
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  card: {
    minHeight: '150px',
    maxHeight: '150px',
    minWidth: '100px',
    padding: '10px',
    justifyContent: "center",
    margin: '10px'

  },
  cardPlus: {
    backgroundColor: 'red'
  },
  cardAction: {
    display: 'inline-block',
    margin: '3px',
    textAlign: 'center',
  },
  bullet: {
    marginLeft: '5%',
    width: "90%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: '15px',
  },
  button: {
    width: '50px',
    height: '40px',
    margin: '0',
    fontSize: '15x'

  }
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
        <h2 >{this.state.heading}</h2>
        <Grid container spacing={32} className={classes.gridContainer} >
          <Grid
            container
            spacing={16}
            direction="column"
            alignItems="center"
            justify="center"
          >
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
                      <Typography className={classes.cardPlus} component="p">
                        Expires on: {moment(spice.exp_date).format('YYYY-MM-DD')}
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


                  // <Card className={classes.card} >
                  //   <CardContent>
                  //     <CardActions className={classes.cardAction}>
                  //       <Button className={classes.button} component={Link} to='/recipe' variant="outlined" color="primary" >Recipes</Button>
                  //     </CardActions >
                  //     <CardActions className={classes.cardAction}>
                  //       {/* <Button onClick={this.editingSpice} component={Link} to={'/editspice/' + spice_id} size="small">Edit Spice</Button> */}
                  //       <Overlay toggleState={this.toggleState} spice={spice} />
                  //       {/* <Button onClick={() => this.props.history.push('/editspice/' + spice_id)} size="small">Edit Spice</Button> */}
                  //     </CardActions >
                  //     <br />
                  //     <CardActions className={classes.cardAction}>
                  //       <Button className={classes.button} onClick={this.deleteSpice} variant="outlined" color="primary" >Delete</Button>
                  //     </CardActions>
                  //     <CardActions className={classes.cardAction}>
                  //       <Button className={classes.button} onClick={this.toggleState} variant="outlined" color="primary" >Cancel</Button>
                  //     </CardActions>
                  //   </CardContent>
                  // </Card>

                )
              } else if (today.diff(expDate, 'days') > -30) {
                return (
                  <Card key={i} align="center" onClick={this.toggleState} className={classes.card}>
                    <CardContent>
                      <Typography justify="center" variant="h5" component="h2">
                        {spice.name}
                        <br />

                      </Typography>

                      <br />


                      <Typography component="p">
                        Expired on: {moment(spice.exp_date).format('YYYY-MM-DD')}
                      </Typography>

                      <CardActions className={classes.cardAction}>
                        <Overlay toggleState={this.toggleState} spice={spice} />
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
          </Grid>
        </Grid>
      </div>

    );
  }
}

const withRouterExpList = withRouter(ExpList)

const styleExpList = withStyles(styles)(withRouterExpList)

export default connect(mapStoreToProps)(styleExpList);