import { authService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { updateProfile } from 'firebase/auth';
import useTitle from 'components/useTitle';


const Profile = ({ userObj, refreshUser }) => {
    const changeTitle = useTitle();
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (e) => {
        const {
            target: { value }
        } = e;
        setNewDisplayName(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        };
    };

    useEffect(() => {
        changeTitle('Profile');
    }, []);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    onChange={onChange}
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" className="Btn updateProfileBtn" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick} className="Btn logoutBtn">Log Out</button>
        </>
    )
};

export default Profile;