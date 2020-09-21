import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

import { withStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const styles = {
    margin: {
        margin: '3px'
    },
    button: {
        width: '80px',
        height: '60px',
        backgroundColor: "#6e7e85",
        color: 'white',
        float: 'right',
        margin: '15px',
    },
    wrapper: {
        float: 'left',
        display: 'flex',
        marginLeft: '90px' 
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
        // makesure inpiut is filled out 
        if (props.stateCheck === ''){
            alert('Please fill out at least the name of the spice.')
            return false
        } else {
        handleClickOpen()
        props.addSpice()
        props.clearState()
        return true
        }

    }

    

    return (
        <div className={classes.wrapper}>
            <Button className={classes.button} onClick={handleAdd}>
                Save
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Success!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your spice has been added! Return home or add more?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* all done go back home */}
                    <Button className={classes.button} variant="outlined" color="primary" component={Link} to='/user'>
                        Return home
                </Button>
                {/* stay on page adn add more */}
                    <Button onClick={handleClose} className={classes.button} variant="outlined" color="primary" >
                        Add more
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const withStyleAddSpiceDialog = withStyles(styles)(AddSpiceDialog)

const withRouteAddSpiceDialog = withRouter(withStyleAddSpiceDialog)

export default connect(mapStoreToProps)(withRouteAddSpiceDialog);