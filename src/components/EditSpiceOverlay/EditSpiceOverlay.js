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
        width: '70px',
        height: '60px'
    }
}

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OverlayEditButton(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.spice.name)
    const [exp_date, setExpDate] = React.useState(props.spice.exp_date)
    const [categories, setCategories] = React.useState()
    const handleClickOpen = () => {
        let spiceCategories = []
        props.store.categoriesList.map((category, i) => {
            if (category.spice_id === props.spice.id) {
                spiceCategories.push(category.id)
            }
        })
        setCategories(spiceCategories)

        setOpen(true);
    };
    const { classes } = props;


    const handleClose = () => {
        setName(props.spice.name)
        setExpDate(props.spice.exp_date)
        setOpen(false);
    };

    const handleDateChange = (event) => {
        setExpDate(event.target.value);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleSelectChange = (event) => {
        setCategories(event.target.value)
        console.log(categories)
    }
    const handleEdit = () => {
        props.dispatch({type: 'EDIT_SPICE',
         payload: {
            id: props.spice.id,
            name: name,
            exp_date: exp_date,
            categories_id: categories,
          } })
          handleClose()
    }

    return (
        <div>
            <Button className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Make any changes needed and click save.
          </DialogContentText>

                    {/* // NAME */}
                    <TextField
                        autoFocus
                        value={name}
                        margin="dense"
                        id="name"
                        label="SpiceName"
                        type="text"
                        fullWidth
                        onChange={handleNameChange}
                    />

                    {/* // DATE */}
                    <TextField type='Date'
                        label="Expiration Date"
                        fullWidth
                        id="exp-date"
                        value={moment(exp_date).format('YYYY-MM-DD')}
                        onChange={handleDateChange}
                        inputProps={{
                            name: 'exp_date',
                            id: 'exp-date',
                        }}
                    />

                    {/* // CATEGORIES */}
                    <InputLabel htmlFor="category-simple">Categories</InputLabel>
                    <Select
                        onChange={handleSelectChange}
                        value={categories}
                        multiple>
                        {props.store.uniqueCategories.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item.id} >
                                    {String(item.name)}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const withStyleEditOverlay = withStyles(styles)(OverlayEditButton)

const withRouteEditOverlay = withRouter(withStyleEditOverlay)

export default connect(mapStoreToProps)(withRouteEditOverlay);