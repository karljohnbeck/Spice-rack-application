import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

import { Input, withStyles, Grid, Select, Typography, Button, CardContent, CardActions, Card } from '@material-ui/core';

const styles = {
    gridContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    card: {
        minHeight: '200px',
        minHeight: '200px',

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

    render() {
        const { classes } = this.props;
        return (
            <div>

                {this.state.isSpice ?
                        <Card onClick={this.toggleState} className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Japanease Curry Powder
                                </Typography>

                                <br />

                                <Typography variant="h5" component="h2">
                                    Categories List
                                </Typography>
                            </CardContent>
                        </Card>
                :
                        <Card onClick={this.toggleState} className={classes.card}>
                            <CardActions className={classes.cardAction}>
                                <Button component={Link} to='/recipe' size="small">Recipes</Button>
                            </CardActions>
                            <br />
                            <CardActions className={classes.cardAction}>
                                <Button component={Link} to='/editspice' size="small">Edit Spice</Button>
                            </CardActions>
                            <br />
                            <CardActions className={classes.cardAction}>
                                <Button  size="small">Delete</Button>
                            </CardActions>
                        </Card>
                }
            </div>
        );
    }
}

const styleSpiceList = withStyles(styles)(SpiceList)


export default connect(mapStoreToProps)(styleSpiceList);
