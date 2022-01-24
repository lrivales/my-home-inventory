import React from "react";

const Login = () => {
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Please log in or sign up to continue.</h1>
            <br />
            <br />
            <br />
            <br />
            <div className="columns form-padding">
                <div className="column">
                    {/* login form */}
                    <div className="form-group">
                        <h4>Log In</h4>
                        <label className="form-label" for="email">Email:</label>
                        <input className="form-input input-lg" type="text" id="login-email" placeholder="Email"></input>
                        <label className="form-label" for="password">Password:</label>
                        <input className="form-input input-lg" type="text" id="login-password" placeholder="Password"></input>
                        <br />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
                <div className="divider-vert" data-content="OR"></div>
                <div className="column">
                    {/* signup form */}
                    <h4>Sign Up</h4>
                    <label className="form-label" for="email">Username:</label>
                    <input className="form-input input-lg" type="text" id="signup-username" placeholder="Username"></input>
                    <label className="form-label" for="email">Email:</label>
                    <input className="form-input input-lg" type="text" id="signup-email" placeholder="Email"></input>
                    <label className="form-label" for="password">Password:</label>
                    <input className="form-input input-lg" type="text" id="signup-password" placeholder="Password"></input>
                    <br />
                    <button type="submit" className="btn btn-primary">Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Login;