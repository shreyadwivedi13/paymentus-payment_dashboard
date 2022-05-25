import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'

import { TimeoutModal } from '../timeout-modal';

import { loginContext } from "../../App";
import { Dashboard, Home, Logout} from '@mui/icons-material';
import "./sidebar.styles.css"
import { Button } from '@mui/material';




const Sidebar = () => {
    const {loginState, dispatch} = useContext(loginContext);

   

    return (
        <>
            {loginState.isLoggedIn ? (
            <div className="sidebar">
                <div className="sidebarWrapper">
                <div className="sidebarMenu">
                <h3 className="dashboard-item"><Link className="dash-ele" id="item-one" to='/dashboard' underline='none'><Dashboard fontSize="large" color='primary'/>Find Payment</Link> </h3>

                <h3 className="dashboard-item"><Link className="dash-ele" id="item-two" to='/home'><Home fontSize="large" color='primary'/><strong>Home</strong></Link> </h3>
                    
                </div>
               
            </div>
            </div>
            ) : (<h1>You are not logged in</h1>)
            }
        </>
    );
};

export default Sidebar;