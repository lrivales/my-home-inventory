import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Navbar = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    
    return (
        <div className='bg-color-tertiary'>
            <header className="navbar">
                <section className="navbar-section">
                    <h3 className="text-light" style={{paddingTop: "10px", paddingLeft: "10px"}}>Home Inventory</h3>
                </section>
                <section className="navbar-section">
                    <div className="input-group input-inline" style={{paddingRight: "10px"}}>
                        {Auth.loggedIn() 
                            ? <>
                                <Link to="/home-inventory/items" className="btn btn-link text-light">Items</Link>
                                <a href='/' className='btn btn-link text-light' onClick={logout}>Logout</a>
                            </>
                            : <>
                                <Link to='/home-inventory' className='btn btn-link text-light'>Home</Link>
                                <Link to="/home-inventory/login" className="btn btn-link text-light">Login</Link>
                            </>
                        }
                    </div>
                </section>
            </header>
        </div>
    )
};

export default Navbar;