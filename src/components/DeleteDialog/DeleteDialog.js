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
        width: '50px',
        height: '40px'
    },
    margin: {
        margin: '3px'
    }
}

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function DeleteDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.spice)
    };
    const { classes } = props;


    const handleClose = () => {
        props.toggleState()
        setOpen(false);
    };

    const handleDelete = (id) => {

        props.dispatch({ type: 'DELETE_SPICE', payload: id })
        handleClose()
    }

    return (
        <div>
            <Button className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
                Delete
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete spice</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this spice?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} variant="outlined" color="primary" onClick={handleClose}>
                        Cannel
                </Button>
                    <Button onClick={() => handleDelete(props.spice.id)} className={classes.button} variant="outlined" color="primary" >
                        Delete
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const withStyleDeleteDialog = withStyles(styles)(DeleteDialog)

const withRouteDeleteDialog = withRouter(withStyleDeleteDialog)

export default connect(mapStoreToProps)(withRouteDeleteDialog);