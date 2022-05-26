import React, { useState, useContext } from "react";

import { Sidebar, Topbar,Footer } from "../../components";

import { loginContext } from "../../App";
import "./dashboard.styles.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Table,TableCell,TableContainer,TableHead,TableRow, Paper, FormControl, TextField, Button ,InputLabel,Select,MenuItem, TableBody, Grid} from '@mui/material';
import {PageviewRounded,ScreenSearchDesktop, SearchRounded} from '@mui/icons-material';


const Dashboard = () => {
  const [isTableVisible, setTableVisible] = useState(false);
  const { loginState } = useContext(loginContext);

  //form state variables - start
  const [userId, setUserId] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  var [paymentAmountMinRange, setPaymentAmountMinRange] = useState("");
  var [paymentAmountMaxRange, setPaymentAmountMaxRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  //form state variables - start
  const [paymentData, setPaymentData] = useState([]);
  
  //validation variable
  const [invalidPaymentAmountRange, setInvalidPaymentAmountRange] =
    useState("");
  const [invalidPaymentDateRange, setInvalidPaymentDateRange] = useState("");
  const [atLeastOneFieldRequired, setAtLeastOneFieldRequired] = useState("");
  //validation Variable

  var [pageNumber, setPageNumber ] = useState(1);
  var [totalPages, setTotalPages ] = useState();

  const navigate = useNavigate();

  const arr = {}

  const inputHandler = (event) => {
    setPageNumber(1);
    setTableVisible(false);
    if (event.target.name === "user_id") {
      setUserId(event.target.value);
    }

    if (event.target.name === "confirmation_number") {
      setConfirmationNumber(event.target.value);
    }

    if (event.target.name === "paymentType") {
      setPaymentType(event.target.value);
    }

    if (event.target.name === "account_number") {
      setAccountNumber(event.target.value);
    }

    if (event.target.name === "email_address") {
      setEmail(event.target.value);
    }

    if (event.target.name === "channel") {
      setChannel(event.target.value);
    }

    if (event.target.name === "min_range") {
      setPaymentAmountMinRange(event.target.value);
    }

    if (event.target.name === "max_range") {
      setPaymentAmountMaxRange(event.target.value);
    }

    if (event.target.name === "start_date") {
      setStartDate(event.target.value);
    }

    if (event.target.name === "end_date") {
      setEndDate(event.target.value);
    }

    if (event.target.name === "paymentMethod") {
      setPaymentMethod(event.target.value);
    }

    if (event.target.name === "status") {
      setPaymentStatus(event.target.value);
    }
  };

  const filterFunctionality = (event) => {
    setTableVisible(false);
    event.preventDefault();
    if (
      userId === "" &&
      confirmationNumber === "" &&
      paymentType === "" &&
      accountNumber === "" &&
      email === "" &&
      channel === "" &&
      paymentAmountMinRange === "" &&
      paymentAmountMaxRange === "" &&
      startDate === "" &&
      endDate === "" &&
      paymentMethod === "" &&
      paymentStatus === ""

      
    ) {
      console.log("here");
      setTableVisible(false);
      setAtLeastOneFieldRequired("At least one field needs to be filled");
      return;
    }

    setAtLeastOneFieldRequired("");

    if (paymentAmountMinRange !== "" && paymentAmountMaxRange !== "") {
      if (paymentAmountMinRange > paymentAmountMaxRange) {
        setInvalidPaymentAmountRange("Invalid Amount Range");
        return;
      } else {
        setInvalidPaymentAmountRange("");
        setTableVisible(false);
      }
    }

    if (startDate !== "" && endDate !== "") {
      if (startDate > endDate) {
        setInvalidPaymentDateRange("Invalid Amount Range");
        return;
      } else {
        setInvalidPaymentDateRange("");
        setTableVisible(false);
      }
    }

   

    populateFilterData();
 
  getTableData(pageNumber);
  setTableVisible(true);

  };


  function populateFilterData (){

    if(userId !==""){
      arr["userId"] = userId;
      console.log("userId added")
    }
    if(confirmationNumber !==""){
      arr["confirmationNumber"] = confirmationNumber;
      console.log("confirmationNumber added")
    }
    if(paymentType !==""){
      arr["paymentType"] = paymentType;
      console.log("paymentType added")
    }
    if(accountNumber !==""){
      arr["accountNumber"] = accountNumber;
      console.log("accountNumber added")
    }
    if(email !==""){
      arr["email"] = email;
      console.log("email added")
    }
    if(channel !==""){
      arr["channel"] = channel;
      console.log("channel added")
    }
    if(paymentAmountMinRange !==""){
      arr["paymentAmountMinRange"] = paymentAmountMinRange;
      console.log("paymentAmountMinRange added")
    }else{
      paymentAmountMinRange=null;
      arr["paymentAmountMinRange"] = paymentAmountMinRange;
      console.log("paymentAmountMinRange added NULL")
    }
    if(paymentAmountMaxRange !==""){
      arr["paymentAmountMaxRange"] = paymentAmountMaxRange;
      console.log("paymentAmountMaxRange added")
    }else{
      paymentAmountMaxRange=null;
      arr["paymentAmountMaxRange"] = paymentAmountMaxRange;
      console.log("paymentAmountMaxRange added NULL")
    }
  
      arr["startDate"] = startDate;
      console.log("startDate added")
   
   
      arr["endDate"] = endDate;
      console.log("endDate added")

    if(paymentMethod !==""){
      arr["paymentMethod"] = paymentMethod;
      console.log("paymentMethod added")
    }
    if(paymentStatus !==""){
      arr["Status"] = paymentStatus;
      console.log("paymentStatus added")
    } 
  }

  const getTableData = async (pageNumber) => {
    const token = sessionStorage.getItem("accessToken");
    console.log(arr)

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'auth-token': token },
      body: JSON.stringify(arr)
    };
  
    const request = fetch('http://localhost:3300/payments?page='+pageNumber, requestOptions);
    const response = await request;
    const data = await response.json();
    console.log(data.numberOfPages)
    console.log(data.payments)
    setTotalPages(data.numberOfPages);
    setPaymentData(data.payments);
    console.log(paymentData)
 
};

  function handleNextPage() {
    populateFilterData();
    pageNumber++;
    setPageNumber(pageNumber)
    
   getTableData(pageNumber);
  };

  function handlePreviousPage() {
    populateFilterData();
    pageNumber--;
    setPageNumber(pageNumber)
   getTableData(pageNumber);
  };

 
    
  const textfieldStyle={}
  const buttonStyle = { margin: "40px auto", borderRadius: "1rem", backgroundColor: "#357cc1" }
  const pageNavbtn = {marginLeft: "10px", marginBottom: "10px"}

  const paperStyle = {padding:30, margin: "-1% 5vh" ,width:"85vh", borderRadius:'1.5rem', backgroundColor:"aliceblue", minWidth:"250px", minHeight:"300px"}

  return (
    <>
      {loginState.isLoggedIn ? (
        <section>
           <Topbar />
                 <div className='container'>
          <h1>{channel}</h1>
          <Sidebar />
          <div className="dashboard">


          <br></br>
          <br></br>

          <Paper id="searchForm" elevation={10} style={paperStyle}>
          <Grid id="iconHeading"align="center">  < ScreenSearchDesktop fontSize="large" id="desktopIcon" />  <h2 id="heading">   Filter Form </h2></Grid >
            <form onSubmit={filterFunctionality} id="filterform">
            <TextField style={textfieldStyle}
            className="standard-basic"
            label="User ID"
            fullWidth
              value={userId}
              onChange={inputHandler}
              type="text"
              name="user_id"
              variant="standard"
            />
            <br></br>
            <br></br>
            <TextField style={textfieldStyle}
            className="standard-basic"
            label="Confirmation Number"
            fullWidth
              value={confirmationNumber}
              onChange={inputHandler}
              type="number"
              name="confirmation_number"
              variant="standard"
            />
            <br></br>
            <br></br>
            
           

            <TextField style={textfieldStyle}
 className = "standard-basic"            label="Account Number"
            fullWidth
              value={accountNumber}
              onChange={inputHandler}
              type="number"
              name="account_number"
              variant="standard"
            />
            <br></br>
            <br></br>
            <TextField style={textfieldStyle}
 className = "standard-basic"
             label="Email Address "
            fullWidth
              value={email}
              onChange={inputHandler}
              type="email"
              name="email_address"
              variant="standard"
            />
            <br></br>
            <br></br>
           
           
            <FormControl fullWidth  >
        <InputLabel id="demo-simple-select-label">Channel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={channel}
          onChange={inputHandler}
          label="Channel"
          name="channel"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"returns_chargebacks_channel"}>Returns/Chargebacks Channel
</MenuItem>
          <MenuItem value={"agent_dashboard"}>Agent Dashboard (Debit)</MenuItem>
          <MenuItem value={"integration_gateway"}>Integration Gateway</MenuItem>
          <MenuItem value={"instant_payment_network"}>Instant Payment Network</MenuItem>
          <MenuItem value={"ivr_channel"}>IVR Channel</MenuItem>
          <MenuItem value={"moneygram"}>MoneyGram</MenuItem>
          <MenuItem value={"mobile_channel"}>Mobile Channel</MenuItem>
          <MenuItem value={"pdf_paymeny"}>PDF Payment</MenuItem>
          <MenuItem value={"pro_active_payment"}>Pro Active Payment</MenuItem>
          <MenuItem value={"mastercard_rpps"}>MasterCard RPPS</MenuItem>
          <MenuItem value={"scheduled_payment_channel"}> Scheduled Payment Channel</MenuItem>
          <MenuItem value={"sms_payment"}>SMS Payment</MenuItem>
          <MenuItem value={"web_channel"}>Web Channel</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <br></br>
            <FormControl fullWidth >
        <InputLabel id="demo-simple-select-standard-label">Payment Method</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={paymentMethod}
          onChange={inputHandler}
          label="Payment Method"
          name="paymentMethod"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"visa"}>Visa</MenuItem>
          <MenuItem value={"visa_debit"}>Visa (Debit)</MenuItem>
          <MenuItem value={"mastercard"}>MasterCard</MenuItem>
          <MenuItem value={"mastercard_debit"}>MasterCard (Debit)</MenuItem>
          <MenuItem value={"american_express"}>American Express</MenuItem>
          <MenuItem value={"checking_account"}>Checking Account</MenuItem>
          <MenuItem value={"discover"}>Discover</MenuItem>
          <MenuItem value={"savings_accounts"}>Savings Accounts</MenuItem>
          <MenuItem value={"walkin_cash"}>Walkin Cash</MenuItem>
          <MenuItem value={"fiserv_external_payment"}>Fiserv External Payment</MenuItem>
          <MenuItem value={"mastercard_rpps_external_payment"}>MasterCard RPPS External Payment</MenuItem>
          <MenuItem value={"ipppays_kiosk_cash"}>IPPPays Kiosk Cash</MenuItem>
          <MenuItem value={"walkin_check"}>Walkin Check</MenuItem>
          <MenuItem value={"green_dot"}>Green Dot</MenuItem>
        </Select>
      </FormControl>
            <br></br>
            <br></br>
            <FormControl fullWidth>
            <InputLabel className="demo-simple-select-standard-label">status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={paymentStatus}
          onChange={inputHandler}
          label="status"
          name="status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"accepted"}>Accepted</MenuItem>
          <MenuItem value={"authorized"}>Authorized</MenuItem>
          <MenuItem value={"mastercard"}>Cancelled</MenuItem>
          <MenuItem value={"declined"}>Declined</MenuItem>
          <MenuItem value={"failed"}>Failed</MenuItem>

          <MenuItem value={"processing"}>Processing</MenuItem>

          <MenuItem value={"queued"}>Queued</MenuItem>

          <MenuItem value={"returned"}>Returned</MenuItem>

          <MenuItem value={"scheduled"}>Scheduled</MenuItem>

          <MenuItem value={"submitted"}>Submitted</MenuItem>
          <MenuItem value={"cancelled_void"}>Cancelled (Void)</MenuItem>
          <MenuItem value={"refunded"}>Refunded</MenuItem>
          <MenuItem value={"card_present_terminal_initiated"}> Card-Present Terminal Initiated</MenuItem>
        </Select>
            </FormControl>
            <br></br>
            <br></br>
            <br></br>
      
            <h3>Payment Amount Range :</h3>
            <br></br> 
          
            <TextField style={textfieldStyle}
             className = "standard-basic"
             label="From "
             fullWidth
              value={paymentAmountMinRange}
              onChange={inputHandler}
              type="number"
              name="min_range"
            />
    <br></br>
    <br></br>
            <TextField style={textfieldStyle}
             className = "standard-basic"
             label="To "
             fullWidth
              value={paymentAmountMaxRange}
              onChange={inputHandler}
              type="number"
              name="max_range"
            />
            <br></br>
            <div  className="errorMSG">{invalidPaymentAmountRange}</div>
            <br></br>
            <br></br>
            <h3>Payment Date Range:</h3>
            <br></br><div className="endDpicker">
            <p className="endDheading">Start Date:{" "}</p>
            <input
              type="date"
              name="start_date"
              value={startDate}
              onChange={inputHandler}
              className="datePicker"
              id="startDvalue"

            ></input></div>
            <br></br>
            <br></br><div className="endDpicker">
            <p className="endDheading">End Date:{" "}
</p>
            <input
              type="date"
              name="end_date"
              value={endDate}
              onChange={inputHandler}
              className="datePicker"
              id="endDvalue"
            ></input>
            </div>
            <br></br>
            <div className="errorMSG">{invalidPaymentDateRange}</div>
            <br></br>
          
            <div  className="errorMSG">{atLeastOneFieldRequired}</div>

            <Button type="submit" variant="contained" value="Search"       size = "medium"
  style = { buttonStyle } ><SearchRounded/> Search </Button>
          </form>
          </Paper>
          
          {isTableVisible && <h4><div className="transactions"></div>
          <div className="transactionTable">
          <strong><h2>Transactions:</h2></strong>

            <TableContainer component={Paper}>
            <Table className="tables" aria-label="simple table"  >
            <TableHead >
            <TableRow>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Account Number</TableCell>
              <TableCell align="left">Channel</TableCell>
              <TableCell align="left">Confirmation Number</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Payment Amount</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Payment Type</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody >
            {paymentData.map((payment) => (
              <TableRow key={payment.confirmationNumber} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="payment">{payment.Status}</TableCell>
                <TableCell align="left">{payment.accountNumber}</TableCell>
                <TableCell align="left">{payment.channel}</TableCell>
                <TableCell align="left">{payment.confirmationNumber}</TableCell>
                <TableCell align="left">{payment.email}</TableCell>
                <TableCell align="left">{payment.paymentAmount}</TableCell>
                <TableCell align="left">{payment.paymentMethod}</TableCell>
                <TableCell align="left">{payment.paymentType}</TableCell>
                <TableCell align="left">{payment.paymentDate}</TableCell>
                <TableCell align="left">{payment.userId}</TableCell>
                <TableCell align="left"><Link to="/PaymentDetails" state={{ confirmationKey: payment.confirmationNumber }} id="viewdets">
                <PageviewRounded/> Details</Link></TableCell>              
              </TableRow>
              ))}
            </TableBody>
            </Table>
            <Button type="button" variant="contained" size="small" disabled={pageNumber===1} onClick={handlePreviousPage} style={pageNavbtn}>Previous Page</Button>
          <Button type="button"variant="contained" size="small"  disabled={pageNumber===totalPages} onClick={handleNextPage} style={pageNavbtn}>Next Page</Button>
         
</TableContainer>
</div>
            </h4>}
           
          </div>
          </div>
          <Footer/>
        </section>
      ) : (
        <div><div id="warning"><h2 id="warningHeader" color="red"><strong>The requested URL was not found on this server.</strong></h2>
        <div id="warningDescription"><ul><li><p>you might have been logged out, please try logging in again.</p></li>
          <li><p>if you entered the URL manually please check your spellings.</p></li>
           <li><p>if you think this is a server error, please contact the Administrator.</p></li></ul></div></div><Footer/></div>

      )}
    </>
  );
};
export default Dashboard;
