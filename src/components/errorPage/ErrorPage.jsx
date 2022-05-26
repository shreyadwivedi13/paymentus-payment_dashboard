import React from "react";
import "./errorPage.styles.css"


const ErrorPage = () => {
    
    return (
        <>
        <div className="topbarNav">
        <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Paymentus</span></div></div></div>
        <div id="warning"><h2 id="warningHeader" color="red"><strong>The requested URL was not found on this server.</strong></h2>
        <div id="warningDescription"><ul><li className="errorLines"><p>you might have been logged out, please try logging in again.</p></li>
          <li  className="errorLines"><p>if you entered the URL manually please check your spellings.</p></li>
           <li  className="errorLines"><p>if you think this is a server error, please contact the Administrator.</p></li></ul></div></div>
                
        </>
    )
}
export default ErrorPage;