import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Menu, MenuItem, Button } from '@material-ui/core'
import hamburger from './Nav_img/hamburger.png'

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div className="nav-right">
        <div className="hamburger">
      {props.store.user.id && (
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img className='hamburgerMenu' src={hamburger} />
      </Button>
      )}
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>

          {props.store.user.id && (

            <MenuItem onClick={handleClose} component={Link} to='/home'>
              Home
            </MenuItem>

          )}

          {props.store.user.id && (

            <MenuItem onClick={handleClose} component={Link} to="/info">
              Info
            </MenuItem>

          )}
          <MenuItem onClick={handleClose} component={Link} to="/about">
            About
      </MenuItem>
          <MenuItem  onClick={handleClose} onClick={ () => props.dispatch({ type: 'LOGOUT' })}>
            Logout
      </MenuItem>
        </Menu>



        {!props.store.user.id && (
          <Link className="nav-link" to={loginLinkData.path}>
            {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
            {loginLinkData.text}
          </Link>
        )}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {/* {!props.store.user.id && (

          <Link className="nav-link" to="/info">
            Info Page
          </Link>
          // <LogOutButton className="nav-link" />

        )} */}
        {/* Always show this link since the about page is not protected */}
        {!props.store.user.id && (

          <Link className="nav-link" to="/about">
            About
          </Link>
        )}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
