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

import deleteIcon from './Icons/trash.png';


const styles = {
    button: {
        width: '50px',
        height: '40px'
    },
    margin: {
        margin: '3px'
    },
    img: {

        marginTop: '10px',

        Width: '45px',
        height: '45px',


        margin: '5px',
        float: 'right'

    },
}

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function DeleteCategoryDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.id)
    };
    const { classes } = props;


    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (id) => {

        props.dispatch({ type: 'DELETE_CATEGORY', payload: id})
        handleClose()
    }

    return (
        <div>
            <img className={classes.img} onClick={handleClickOpen} src={deleteIcon} alt="delete" />
            {/* <Button className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
                Delete
            </Button> */}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this category?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} variant="outlined" color="primary" onClick={handleClose}>
                        Cannel
                </Button>
                    <Button onClick={() => handleDelete(props.id)} className={classes.button} variant="outlined" color="primary" >
                        Delete
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const withStyleDeleteCategoryDialog = withStyles(styles)(DeleteCategoryDialog)

const withRouteDeleteCategoryDialog = withRouter(withStyleDeleteCategoryDialog)

export default connect(mapStoreToProps)(withRouteDeleteCategoryDialog);