import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link, withRouter  } from 'react-router-dom';


import { withStyles, Typography, Button, CardContent, CardActions, Card } from '@material-ui/core';

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
class SpiceList extends Component {
    state = {
        heading: 'Class Component',
        isSpice: true
    };

    toggleState = () => {
        this.setState({
            isSpice: !this.state.isSpice
        })
    }

    deleteSpice = () => {
    this.props.dispatch({type: 'DELETE_SPICE', payload: this.props.spice.id})
    }




    render() {
        const { classes } = this.props;
        const spice_id = this.props.spice.id

        return (
            <div>

                {this.state.isSpice ?
                    <Card onClick={this.toggleState} className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {this.props.spice.name}
                            </Typography>

                            <br />

                            {this.props.store.categoriesList.map((category, i) => {
                                if (this.props.spice.id === category.spice_id) {
                                    return (
                                        <Typography key={i} component="p">
                                            {category.name}
                                        </Typography>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                    :
                    <Card onClick={this.toggleState} className={classes.card}>
                        <CardActions className={classes.cardAction}>
                            <Button component={Link} to='/recipe' size="small">Recipes</Button>
                        </CardActions>
                        <br />
                        <CardActions className={classes.cardAction}>
                            {/* <Button onClick={this.editingSpice} component={Link} to={'/editspice/' + spice_id} size="small">Edit Spice</Button> */}
                            <Button onClick={() => this.props.history.push('/editspice/' + spice_id)} size="small">Edit Spice</Button>

                        </CardActions>
                        <br />
                        <CardActions className={classes.cardAction}>
                            <Button onClick={this.deleteSpice} size="small">Delete</Button>
                        </CardActions>
                    </Card>
                }
            </div>
        );
    }
}

const withRouterSpiceList = withRouter(SpiceList) 

const styleSpiceList = withStyles(styles)(withRouterSpiceList)

export default connect(mapStoreToProps)(styleSpiceList);
