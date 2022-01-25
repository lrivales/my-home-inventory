import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-color-tertiary'>
            <header className="navbar">
                <section className="navbar-section">
                    <h3 style={{paddingTop: "10px", paddingLeft: "10px"}}>Home Inventory</h3>
                </section>
                <section className="navbar-section">
                    <div className="input-group input-inline" style={{paddingRight: "10px"}}>
                        <Link to='/home-inventory' className='btn btn-link text-light'>Home</Link>
                        <Link to="/home-inventory/login" className="btn btn-link text-light">Login</Link>
                        <Link to="/home-inventory/items" className="btn btn-link text-light">Items</Link>
                    </div>
                </section>
            </header>
        </div>
    )
};

export default Navbar;