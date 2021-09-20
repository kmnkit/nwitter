import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { authService, dbService } from 'fbase';
import { useState } from 'react';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { updateProfile } from '@firebase/auth';

const AuthForm = () => {
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
                const newUser = await createUserWithEmailAndPassword(
                    authService, email, password
                );
                await updateProfile(newUser, { displayName: "Anonymous" });
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

    return (
        <>
            <div className="logoBox">
                <FontAwesomeIcon className="logo" icon={faTwitter} />
            </div>
            <form onSubmit={onSubmit} className="LoginForm">
                <input
                    name="email"
                    type="email"
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
                <div className="BtnContainer">
                    <input className="Btn SignupBtn" type="submit" value={newAccount ? "Create Account" : "Log In"} />
                </div>
                {error}
            </form>
            <div className="Transform">
                <span onClick={toggleAccount}>{newAccount ? "Click to Log In" : "Click to Create Account"}</span>
            </div>
        </>
    );
};

export default AuthForm;