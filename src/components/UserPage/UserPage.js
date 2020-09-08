import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import SpiceList from '../SpiceList/SpiceList'

// material ui 
import { Input, withStyles, Grid, Select, Typography, Button, CardContent, CardActions, Card} from '@material-ui/core';


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
  this.props.dispatch({type: 'FETCH_SPICELIST'})
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
            <Input className={classes.margin} placeholder="search" />
            <br />           
          

              <Button className={classes.margin}>+ Add a spice</Button>
              
              {/* Needs to be multi select eventually */}
              <Select className={classes.margin} value ={0} ></Select>
                </Card>
                </Grid>

        </Grid>
        

        

         {/* <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Japanease Curry Powder
              </Typography>

              <br />

              <Typography variant="h5" component="h2">
                Japanease Curry Powder
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={6} >
          <Card className={classes.card}>
            <CardActions className={classes.cardAction}>
              <Button size="small">Learn More</Button>
            </CardActions>
            <br />
            <CardActions className={classes.cardAction}>
              <Button size="small">Learn More</Button>
            </CardActions>
            <br />

            <CardActions className={classes.cardAction}>
              <Button size="small">Learn More</Button>
            </CardActions> 
            </Card>
                    </Grid>
             */}


        <Grid item xs={6}>
        <SpiceList />
        </Grid>

          
      </Grid>


    );
  }
}

// this allows us to use <App /> in index.js
const styleUserPage = withStyles(styles)(UserPage)


export default connect(mapStoreToProps)(styleUserPage);
