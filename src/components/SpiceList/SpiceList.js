import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

import { Chip, withStyles, Typography, Button, CardContent, CardActions, Card } from '@material-ui/core';

import Overlay from '../EditSpiceOverlay/EditSpiceOverlay'
import DeleteDialog from '../DeleteDialog/DeleteDialog'

const styles = {
    gridContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    card: {
        minHeight: '150px',
        // maxHeight: '200px',
        minWidth: '100px',
        padding: '10px',
        justifyContent: "center"
    },
    cardPlus: {
        minHeight: '200px',
        maxHeight: '200px',
        padding: '10px',
        justifyContent: "center"
    },
    margin: {
        margin: '15px',
    },
    
    button: {
        width: '80px',
        height: '60px',
        margin: '0',
        fontSize: '15x',
        backgroundColor: "#6e7e85",
        color: 'white'
    },
    cardAction: {
        display: 'inline-block'
    },
    pic: {
        width: '42px',
        height: '42px',
        float: 'right'
    },
    chip: {
        margin: 2,
        backgroundColor: '#ffe2b6'
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
                    <Card align="center" onClick={this.toggleState} >
                        <CardContent>
                            {/* <img className={classes.pic} src={flip}/> */}
                            <Typography className={classes.top} justify="center" fontWeight="fontWeightBold" variant="h4" component="h1">
                                {this.props.spice.name}
                            </Typography>

                            <br />
                            <Typography justify="center" variant="h6" component="h2">
                                Categories:
                            </Typography>
                            {this.props.store.categoriesList.map((category, i) => {
                                if (this.props.spice.id === category.spice_id) {
                                    return (
                                        
                                                 <Chip className={classes.chip} key={i} label={category.name} />
                                
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                    :
                    <Card >
                        <CardContent>
                            <CardActions className={classes.cardAction}>
                            <Button className={classes.button} onClick={() => this.props.history.push('/recipe/' + this.props.spice.name)} variant="outlined" color="primary" size="small">Recipes</Button>
                            </CardActions >

                            <CardActions className={classes.cardAction}>
                                <Overlay toggleState={this.toggleState} spice={this.props.spice} />
                            </CardActions >
                            <br />
                            <CardActions className={classes.cardAction}>
                                <DeleteDialog toggleState={this.toggleState} spice={this.props.spice}/>

                            </CardActions>
                            <CardActions className={classes.cardAction}>
                                <Button className={classes.button} onClick={this.toggleState} variant="outlined" color="primary" >Back</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                }
            </div>
        );
    }
}

const withRouterSpiceList = withRouter(SpiceList)

const styleSpiceList = withStyles(styles)(withRouterSpiceList)

export default connect(mapStoreToProps)(styleSpiceList);
