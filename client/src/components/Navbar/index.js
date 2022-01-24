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
                        <Link to='/' className='btn btn-link text-light'>Home</Link>
                        <Link to="login" className="btn btn-link text-light">Login</Link>
                        {/* <a href="/login" className="btn btn-link">Login</a>
                        <a href='...' className='btn btn-link'>My Account</a>
                        <a href="..." className="btn btn-link">My Items</a>
                        <a href="..." className="btn btn-link">Logout</a> */}
                    </div>
                </section>
                {/* <section className="navbar-section">
                    // for spacing only
                </section> */}
            </header>
        </div>
    )
};

export default Navbar;