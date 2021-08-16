import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, MenuList } from '@material-ui/core'
import cover from "../../images/cover.png";
import { FiShoppingBag, FiMenu, FiX} from "react-icons/fi";
import useStyle from './style'
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';



const Navbar = ({ totalItems }) => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const classes = useStyle();
    const location = useLocation();
    const [ toggle, setToggle ] = useState(false);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
  
    const renderMobileMenu = (
      <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
        <MenuItem>
          <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <FiShoppingBag />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Menu>
    );

    const myStyle = {
      padding: '10px 50px'
    }


    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar style={myStyle} >
                    <Typography component={ Link } to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={cover} alt="commerce.js" height='60px' className={classes.image}/>
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={toggle ? 'stay' : 'remove'}>
                      <MenuList className={classes.list} >
                        <MenuItem  component={ Link } to='/products'><p className='underline'>Products</p></MenuItem>
                        <MenuItem component={ Link } to='/'><p className='underline'>Account</p></MenuItem>
                        <MenuItem component={ Link } to='/'><p className='underline'>About</p></MenuItem>
                      </MenuList>
                    </div>
                    {location.pathname === '/' && (     
                    <div className={classes.button}>
                        <IconButton component={ Link } to='/cart' aria-label="Show cart items" color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                 <FiShoppingBag />
                            </Badge>
                        </IconButton>
                    </div>
                    )}
                    <div className='bars' onClick={() => setToggle(!toggle)}>
                          {toggle ? <FiX/> : <FiMenu/>}
                    </div>  
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </>
    )
}

export default Navbar
