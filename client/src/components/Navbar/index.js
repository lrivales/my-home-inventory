import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-color-tertiary'>
            <header className="navbar">
                <section className="navbar-section">
                    {/* for spacing only */}
                </section>
                <section className="navbar-section">
                    <div className="input-group input-inline">
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