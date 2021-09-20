import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => {
    return (<ul>
        <li>
            <Link to="/">
                <div className="logoBox">
                    <FontAwesomeIcon className="logo" icon={faTwitter} />
                </div>
            </Link>
        </li>
        <li>
            <Link to="/profile">
                {userObj.displayName ? userObj.displayName : "Anynomous"}의 Profile
            </Link>
        </li>
    </ul>)
};

export default Navigation;