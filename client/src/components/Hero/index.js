import React from 'react';
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="hero bg-color-quaternary linear-gradient">
            <div className="hero-body hero-sm">
                <Link to="/">
                    <h1 className='text-custom'>My Home Inventory</h1>
                </Link>
            </div>
        </div>
    )
};

export default Hero;