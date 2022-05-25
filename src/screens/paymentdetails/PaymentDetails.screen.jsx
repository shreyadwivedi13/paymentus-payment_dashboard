import React, { useEffect, useState } from "react";
import { loginContext } from "../../App";
import  { useContext} from 'react';
import { Sidebar,Topbar} from '../../components';
import { useLocation } from 'react-router-dom'
import "./paymentDetails.styles.css";

const PaymentDetails = (props) =>{
    const {loginState} = useContext(loginContext);
    const [isDataPresent, setIsDataPresent] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState([]);

    const location = useLocation()
    const { confirmationKey } = location.state


        useEffect(() =>{
            const getPaymentDetails =  async () => {
                const token = sessionStorage.getItem("accessToken");
                const arr = {
                        "confirmationNumber": confirmationKey
                        
                }
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                     'auth-token': token },
          body: JSON.stringify(arr)
        };
      
        const request = fetch('http://localhost:3300/payments/paymentDetails', requestOptions);
        const response = await  request;
        const data = await  response.json();
        setPaymentDetails(data)
        setIsDataPresent(true)
    };
            getPaymentDetails();
    },[])
     
    
 


    return(
        <>
        {loginState.isLoggedIn ? (
    <section>
    <Topbar />
        <div className='container'>
 <Sidebar />
            { isDataPresent &&
            <div className="payment-details">
                
            {paymentDetails.map((detail)=>(
                       <div id="details">
                       <strong> <h2 id="header">Details</h2></strong>
                       <div className="row">
                    <div className="row-Header">
                    <b>Name :</b></div> <div className="detsDisplay">{detail.Name}</div><br></br><br></br></div>
                    <div className="row">
                    <div className="row-Header">
                   <b> Status :</b> </div><div className="detsDisplay">{detail.Status}</div><br></br><br></br></div>  
                   <div className="row">
                   <div className="row-Header">

                    <b>Zip :</b></div> <div className="detsDisplay">{detail.Zip}</div><br></br><br></br> </div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Account Number :</b></div><div className="detsDisplay">{detail.accountNumber}</div><br></br><br></br> </div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Card Number :</b> </div><div className="detsDisplay">{detail.cardNumber}</div><br></br><br></br> </div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Card Type :</b> </div><div className="detsDisplay">{detail.cardType}</div><br></br> <br></br></div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Channel :</b></div> <div className="detsDisplay">{detail.channel}</div><br></br> <br></br></div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Confirmation Number :</b></div> <div className="detsDisplay">{detail.confirmationNumber}</div><br></br><br></br> </div>
                    <div className="row">
                    <div className="row-Header">

                   <b> Contact Number :</b> </div><div className="detsDisplay">{detail.contactNumber}</div><br></br> <br></br></div>
                   <div className="row">
                   <div className="row-Header">

                    <b>Email :</b></div> <div className="detsDisplay">{detail.email}</div><br></br><br></br> </div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Payment Amount :</b> </div><div className="detsDisplay">{detail.paymentAmount}</div><br></br><br></br></div>
                    <div className="row"> 
                    <div className="row-Header">

                    <b>Payment Date :</b></div> <div className="detsDisplay">{detail.paymentDate}</div><br></br><br></br></div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Payment Method :</b> </div><div className="detsDisplay">{detail.paymentMethod}</div><br></br><br></br></div>
                    <div className="row">
                    <div className="row-Header">

                    <b>Payment Type :</b> </div><div className="detsDisplay">{detail.paymentType}</div><br></br><br></br></div>
                    <div className="row">
                    <div className="row-Header">

                    <b>User ID :</b></div> <div className="detsDisplay">{detail.userId}</div><br></br> <br></br></div>                 
                     </div>

                ))}

                

            </div>
}</div>
        </section>
        ) : (<h1>You are not logged in</h1>)
}
        </>
    )
};

export default PaymentDetails;