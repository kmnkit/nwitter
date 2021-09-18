import React, { useState } from 'react';
import { authService } from 'fbase';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: { name, value }
        } = e;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        };
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {
                await createUserWithEmailAndPassword(
                    authService, email, password
                );
            } else {
                await signInWithEmailAndPassword(
                    authService, email, password
                );
            }
        } catch (error) {
            setError(error.errorMessage);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);
    let provider;
    const onSocialClick = async (e) => {
        const { target: { name } } = e;
        try {
            if (name === 'google') {
                provider = new GoogleAuthProvider();
            } else if (name === 'github') {
                provider = new GithubAuthProvider();
            };
            await signInWithPopup(authService, provider);
            // provider.credentialFromResult(result);
        } catch (error) {
            setError(error.message);
        };
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;