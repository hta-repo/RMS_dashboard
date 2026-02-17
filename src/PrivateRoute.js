import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

//  Redux
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const [isSubscribe, setisSubscribe] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    let token = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (token && token !== 'undefined') {
            if (userInfo && Object.entries(userInfo).length > 0) {
                setisSubscribe(true)
            }
        }
    }, [userInfo, token]);

    if (token && token !== 'undefined') {
        if (isSubscribe) {
            return children;
        }
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;