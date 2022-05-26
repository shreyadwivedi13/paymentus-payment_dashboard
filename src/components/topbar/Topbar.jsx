import React from "react";
import { loginContext } from "../../App";
import  { useContext} from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'

import { TimeoutModal } from '../timeout-modal';
import { Footer } from '../../components';

import { Logout} from '@mui/icons-material';
import { Button } from '@mui/material';
import "./topbar.styles.css"

const IDLE_TIME = 600000;
const LOGOUT_TIME = 300000;
const REFRESH_API_TOKEN = 600000;
let logoutTimerId = undefined;

const Topbar = () => {
    const {loginState, dispatch} = useContext(loginContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        const refreshtoken = sessionStorage.getItem("refreshToken");
            console.log(refreshtoken);

            const refreshObject = {
                "refreshtoken":refreshtoken
            }
            const refreshTheToken = async () =>{
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(refreshObject)
                  };
                
                  const request = fetch('http://localhost:3300/login/refresh-token', requestOptions);
                  const response = await request;
                  const data = await response.json();
                  console.log(data)
                 sessionStorage.setItem("accessToken", data.token);
                sessionStorage.setItem("refreshToken", data.refreshtoken);
    
                }
                refreshTheToken();
     });
     
    useEffect(() => {
        const refreshTokenTimerId = setInterval(() => {
            const refreshtoken = sessionStorage.getItem("refreshToken");
            console.log(refreshtoken);

            const refreshObject = {
                "refreshtoken":refreshtoken
            }

            const refreshTheToken = async () =>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(refreshObject)
              };
            
              const request = fetch('http://localhost:3300/login/refresh-token', requestOptions);
              const response = await request;
              const data = await response.json();
              console.log(data)
             sessionStorage.setItem("accessToken", data.token);
            sessionStorage.setItem("refreshToken", data.refreshtoken);

            }
            refreshTheToken();

        }, REFRESH_API_TOKEN);

        return () => {
            clearInterval(refreshTokenTimerId);
        }
    }, []);

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('activeUsername');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        navigate('/');
    };
    
    const onIdle = () => {
        setShowModal(true);
        logoutTimerId = setTimeout(() => {
            setShowModal(false);
            handleLogout();
        }, LOGOUT_TIME);
    };
    
    const {start, reset} = useIdleTimer({ onIdle, timeout: IDLE_TIME, stopOnIdle: true });
    
    useEffect(() => {
        start();
        // eslint-disable-next-line
    }, []);
    
    const handleShowModal = () => {
        if (logoutTimerId) {
            clearTimeout(logoutTimerId);
            logoutTimerId = undefined;
        }
        setShowModal(false);
        reset();
    };

    const topbarIconStyles={marginInline:"0.6rem"}
    const buttonStyle = { margin: "0 auto", borderRadius: "1rem", backgroundColor: "#357cc1" }

    return (
        <>
        {loginState.isLoggedIn ? (
        <div className="topbarNav">
        <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Paymentus</span></div>
                <div className="topRight">

                    <div className="topbarIconContainer" style={topbarIconStyles}>
                    <h2 id="activeUser">Hello, {loginState.activeUsername}</h2>
                    <Button id="logOut"onClick={handleLogout} variant="contained" fontSize="large" fullWidth style={buttonStyle}><Logout/>Logout</Button>
                     <TimeoutModal show={showModal} toShowModal={handleShowModal} />


                  
                 </div> 
                </div>

            </div>
           </div> ) : (<div><h1>You are not logged in</h1><Footer/></div>)
        }
        </>
    )
}
export default Topbar;