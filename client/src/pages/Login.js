import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
    const [loginFormState, setLoginFormState] = useState({ email: '', password: ''});
    const [login, loginStatus] = useMutation(LOGIN_USER);

    const [signupFormState, setSignUpFormState] = useState({ username: '', email: '', password: ''});
    const [addUser, addUserStatus] = useMutation(ADD_USER);

    const handleLoginFormChange = (event) => {
        const { name, value } = event.target;

        setLoginFormState({
            ...loginFormState,
            [name]: value
        });
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { data } = await login({
              variables: { ...loginFormState },
            });

            Auth.login(data.login.token);
          } catch (err) {
            console.error(err);
          }
      
          setLoginFormState({
            email: '',
            password: '',
          });
    };

    const handleSignupFormChange = (event) => {
        const { name, value } = event.target;

        setSignUpFormState({
            ...signupFormState,
            [name]: value
        });
    };

    const handleSignupFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { data } = await addUser({
                variables: { ...signupFormState }
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <br />
            <br />
            <h1>Please log in or sign up to continue.</h1>
            <br />
            <br />
            <div className="columns form-padding">
                <div className="column">
                    {/* login form */}
                    <div className="form-group">
                        <h4>Log In</h4>
                        <form onSubmit={handleLoginFormSubmit}>
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input 
                                className="form-input input-lg" 
                                name="email" 
                                type="email" 
                                id="login-email" 
                                placeholder="Email" 
                                value={loginFormState.email} 
                                onChange={handleLoginFormChange}
                            />
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input 
                                className="form-input input-lg" 
                                name="password" 
                                type="password" 
                                autoComplete="on"
                                id="login-password" 
                                placeholder="******" 
                                value={loginFormState.password} 
                                onChange={handleLoginFormChange}
                            />
                            <br />
                            <button type="submit" className="btn btn-lg bg-color-tertiary text-light">Login</button>
                        </form>
                        <br />
                        {loginStatus.error && <div>Login failed. Please try again.</div>}
                    </div>
                </div>
                <div className="divider-vert" data-content="OR"></div>
                <div className="column">
                    {/* signup form */}
                    <h4>Sign Up</h4>
                    <form onSubmit={handleSignupFormSubmit}>
                        <label className="form-label" htmlFor="email">Username:</label>
                        <input 
                            className="form-input input-lg" 
                            name="username" 
                            type="text" 
                            id="signup-username" 
                            placeholder="Username" 
                            value={signupFormState.username} 
                            onChange={handleSignupFormChange}
                        />
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input 
                            className="form-input input-lg" 
                            name="email" 
                            type="email" 
                            id="signup-email" 
                            placeholder="Email" 
                            value={signupFormState.email} 
                            onChange={handleSignupFormChange}
                        />
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input 
                            className="form-input input-lg" 
                            name="password" 
                            type="password" 
                            autoComplete="on"
                            id="signup-password" 
                            value={signupFormState.password} 
                            placeholder="Password" 
                            onChange={handleSignupFormChange}
                        />
                        <br />
                        <button type="submit" className="btn btn-lg bg-color-tertiary text-light">Signup</button>
                    </form>
                    <br />
                    {addUserStatus.error && <div>Signup failed. Please try again.</div>}
                </div>
            </div>
        </div>
    )
}

export default Login;