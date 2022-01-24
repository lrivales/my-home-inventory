import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
    const [loginFormState, setLoginFormState] = useState({ email: '', password: ''});
    const [login, loginStatus] = useMutation(LOGIN_USER);

    // const [signupFormState, setSignUpFormState] = useState({ username: '', email: '', password: ''});
    // const [signup, { error }] = useMutation(ADD_USER);

    const handleLoginFormChange = (event) => {
        const { name, value } = event.target;

        setLoginFormState({
            ...loginFormState,
            [name]: value,
        });
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        console.log(loginFormState);
        
        try {
            const { data } = await login({
              variables: { ...loginFormState },
            });
      
            console.log(data);

            Auth.login(data.login.token);
          } catch (e) {
            console.error(e);
          }
      
          // clear form values
          setLoginFormState({
            email: '',
            password: '',
          });
    };

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
                        <form onSubmit={handleLoginFormSubmit}>
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input className="form-input input-lg" name="email" type="email" id="login-email" value={loginFormState.email} placeholder="Email" onChange={handleLoginFormChange}></input>
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input className="form-input input-lg" name="password" type="password" id="login-password" value={loginFormState.password} placeholder="******" onChange={handleLoginFormChange}></input>
                            <br />
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <br />
                        {loginStatus.error && <div>Login failed. Please try again.</div>}
                    </div>
                </div>
                <div className="divider-vert" data-content="OR"></div>
                <div className="column">
                    {/* signup form */}
                    <h4>Sign Up</h4>
                    <label className="form-label" htmlFor="email">Username:</label>
                    <input className="form-input input-lg" type="text" id="signup-username" placeholder="Username"></input>
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input input-lg" type="text" id="signup-email" placeholder="Email"></input>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-input input-lg" type="text" id="signup-password" placeholder="Password"></input>
                    <br />
                    <button type="submit" className="btn btn-primary">Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Login;