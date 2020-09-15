import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Input,
    InputLabel, Select, MenuItem
} from '@material-ui/core';

const styles = {
    button: {
        
    },
    margin: {
        margin: '3px'
    }
}

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AddSpiceDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const { classes } = props;


    const handleClose = () => {
        props.clearState()
        setOpen(false);
    };

    const handleAdd = (id) => {
        handleClickOpen()
        props.addSpice()
        props.clearState()

    }

    

    return (
        <div>
            <Button className={classes.button} onClick={handleAdd}>
                Add Spice 
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Success!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your spice has been added! Return home or add more?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} variant="outlined" color="primary" component={Link} to='/user'>
                        Return home
                </Button>
                    <Button onClick={handleClose} className={classes.button} variant="outlined" color="primary" >
                        Add another spice
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const withStyleAddSpiceDialog = withStyles(styles)(AddSpiceDialog)

const withRouteAddSpiceDialog = withRouter(withStyleAddSpiceDialog)

export default connect(mapStoreToProps)(withRouteAddSpiceDialog);