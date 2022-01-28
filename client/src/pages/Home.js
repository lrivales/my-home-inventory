import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-image-primary">
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1>Welcome to Home Inventory&nbsp;</h1>
                </div>
                <h2>
                    <br />
                    <br />
                    A simple way to keep track
                    <br />
                    <br />
                    of your valuables
                    <br />
                    <br />
                    in case the unthinkable happens.
                    <br />
                    <br />
                </h2>
            </div>
        </div>
    )
}

export default Home;