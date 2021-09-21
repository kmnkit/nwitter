import React from 'react';
import { authService } from 'fbase';
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import AuthForm from 'components/AuthForm';
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Auth = () => {
    let provider;
    const onSocialClick = async (event) => {
        console.log(event);
        const { target: { name } } = event;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        };
        await signInWithPopup(authService, provider);
    };
    return (
        <div>
            <AuthForm />
            <div className="SocialLoginBox">
                <button className="Btn GoogleLogin" onClick={onSocialClick} name="google">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button className="Btn GithubLogin" onClick={onSocialClick} name="github">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    );
};

export default Auth;