import React from 'react';

const Navbar = () => {
    return (
        <div>
            <header className="navbar">
                <section className="navbar-section">
                    {/* for spacing only */}
                </section>
                <section className="navbar-section">
                    <div className="input-group input-inline">
                        <a href="..." className="btn btn-link text-light">Login | Signup</a>
                        <a href='...' className='btn btn-link text-light'>My Account</a>
                        <a href="..." className="btn btn-link text-light">My Items</a>
                        <a href="..." className="btn btn-link text-light">Logout</a>
                    </div>
                </section>
            </header>
        </div>
    )
};

export default Navbar;