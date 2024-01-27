import React from 'react';
import './UserProfile.scss';
import {useSelector} from "react-redux";

const UserProfile = () => {
    const userInfo = useSelector(state => state?.user.userInfo)
    const userId = userInfo.userId

    return (
        <div>

        </div>
    );
};

export default UserProfile;