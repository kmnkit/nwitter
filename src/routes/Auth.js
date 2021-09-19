import React from 'react';
import { authService } from 'fbase';
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import AuthForm from 'components/AuthForm';

const Auth = () => {
    let provider;
    const onSocialClick = async (e) => {
        const { target: { name } } = e;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        };
        await signInWithPopup(authService, provider);
        // provider.credentialFromResult(result);
    };
    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;