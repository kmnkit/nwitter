import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { authService } from 'fbase';
import { useState } from 'react';

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

    return (
        <>
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
        </>
    );
};

export default AuthForm;