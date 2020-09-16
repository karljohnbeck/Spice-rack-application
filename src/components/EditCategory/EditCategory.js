import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import { withRouter, Link } from 'react-router-dom';

// material ui 
import { Typography, withStyles, Button, Card, TextField } from '@material-ui/core';

import editIcon from './Icons/edit.png';
// import deleteIcon from './Icons/trash.png';
import DeleteCategoryDialog from '../DeleteCategoryDialog/DeleteCategoryDialog';



const styles = {
    gridContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    card: {
        minHeight: '65px',
        minWidth: '300px'
    },
    cardAction: {
        backgroundColor: 'yellow',
    },
    img: {

        marginTop: '10px',

        Width: '45px',
        height: '45px',


        margin: '5px',
        float: 'right'

    },
    text: {
        marginTop: '10px',
        display: 'inline-block',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: '5px'
    },
};

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EditCategory extends Component {
    state = {
        heading: 'Categories Component',
        isEdit: true,
        name: this.props.category.name,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    toggleState = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    toggleStatePlus = () => {
        this.setState({
            isEdit: !this.state.isEdit,
            name: this.props.category.name,
        })
    }
    
    // deleteCategory = () => {
    //     this.props.dispatch({ type: 'DELETE_CATEGORY', payload: this.props.category.id })
    // }

    saveEdit = () => {
        console.log(this.state.name)
        this.props.dispatch(
            {
                type: 'EDIT_CATEGORY',
                payload: {
                    id: this.props.category.id,
                    name: this.state.name
                }
            })
        this.toggleState()
    }

    render() {
        const { classes } = this.props;
        return (

            <Card className={classes.card}>
                {this.state.isEdit ?
                    <div>
                        <Typography
                            justify="center"
                            variant="h5"
                            className={classes.text}>
                            {this.props.category.name}
                        </Typography>
                        <DeleteCategoryDialog id={this.props.category.id}/>
                        {/* <img className={classes.img} onClick={this.deleteCategory} src={deleteIcon} alt="delete" /> */}
                        <img className={classes.img} onClick={this.toggleState} alt="edit" src={editIcon} />

                    </div>
                    :
                    <div>
                        <TextField
                            className={classes.margin}
                            variant="filled"
                            autoFocus
                            name="name"
                            value={this.state.name}
                            margin="dense"
                            id="name"
                            label="Category name"
                            type="text"
                            justify="center"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <Button className={classes.margin} onClick={this.toggleStatePlus} variant="outlined">Cancel</Button>
                        <Button className={classes.margin} onClick={this.saveEdit} variant="outlined">Save</Button>

                    </div>
                }
            </Card>
        );
    }
}

const withRouterEditCategory = withRouter(EditCategory)

const withStyleEditCategory = withStyles(styles)(withRouterEditCategory)

export default connect(mapStoreToProps)(withStyleEditCategory);