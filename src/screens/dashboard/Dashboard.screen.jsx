import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { Sidebar, Topbar,Footer,ErrorPage} from "../../components";

import { loginContext } from "../../App";
import "./dashboard.styles.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Table,TableCell,TableContainer,TableHead,TableRow, Paper, FormControl, TextField, Button ,InputLabel,Select,MenuItem, TableBody, Grid} from '@mui/material';
import {PageviewRounded,ScreenSearchDesktop, SearchRounded} from '@mui/icons-material';


let recordsLimit = 5;
let pageNumber = 1;
let totalData = 0;
let totalPages = 0;
let prevPage = 0;
const arr = {};


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
  const [menuItemObj, setMenuItemObj] = useState({});

  //validation Variable
  // var [totalPages, setTotalPages ] = useState();
  const [recordsLimitState, setRecordsLimitState] = useState("5");

  const navigate = useNavigate();

//sececlt options fetch from database
  useEffect(() => {
    const getSelectOptions = async (pageNumber) => {
      const token = sessionStorage.getItem("accessToken");
    
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
      };
      
      const request = await fetch('http://localhost:3300/payments/meta-data', requestOptions);
      const response = await request;
      const data = await response.json();
      setMenuItemObj({...data});    
      console.log(data);
    };

    getSelectOptions();
  }, []);
  //end

  // metaFeildsStatus

  // metaFeildsPaymentType

  // metaFeildschannel

  // metaFeildsPaymentMethod


  const inputHandler = (event) => {
    pageNumber = 1;
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
        setInvalidPaymentDateRange("Invalid Date");
        return;
      } else {
        setInvalidPaymentDateRange("");
        setTableVisible(false);
      }
    }


    populateFilterData();

    getTableData(pageNumber,recordsLimit);
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

  const getTableData = async (pageNumber,fetchRecordLimit) => {
    const token = sessionStorage.getItem("accessToken");
    console.log(arr)

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token 
      },
      body: JSON.stringify(arr)
    };

    const request = fetch(`http://localhost:3300/payments?limit=${fetchRecordLimit}&page=${pageNumber}` , requestOptions);
    const response = await request;
    const data = await response.json();
    totalData = data.numberOfPages;
    totalPages = Math.ceil(totalData / recordsLimit);
    console.log("total data: ", data.numberOfPages);
    console.log("total page: ", totalPages);
    setPaymentData(data.payments);
    console.log(data.payments)
  };

  function handleNextPage() {
    if (pageNumber >= totalPages) return;

    populateFilterData();
    pageNumber++;
    getTableData(pageNumber,recordsLimit);
  };

  function handlePreviousPage() {
    if (pageNumber <= 1) return;

    populateFilterData();
    pageNumber--;
    getTableData(pageNumber,recordsLimit);
  };

  const tableEntriesHandler = (event) => {
    populateFilterData();
    prevPage = pageNumber;
    setRecordsLimitState(event.target.value)
    recordsLimit = event.target.value;
    totalPages = Math.ceil(totalData / recordsLimit);
    if (prevPage > totalPages) {
      pageNumber = totalPages;
    }
    getTableData(pageNumber, recordsLimit);
  }
    
  const textfieldStyle={}
  const buttonStyle = { margin: "40px auto", borderRadius: "1rem", backgroundColor: "#357cc1" }
  const pageNavbtn = {marginLeft: "20px", marginBottom: "20px", marginTop:"0"}

  const paperStyle = {padding:30, margin: "-1% 5vh" ,width:"85vh", borderRadius:'1.5rem', backgroundColor:"aliceblue", minWidth:"250px", minHeight:"300px"}

  return (
    <>
      {loginState.isLoggedIn ? (
        <section>
          <Topbar />
          <div className='container'>
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
          {menuItemObj.hasOwnProperty('metaFeildschannel') && menuItemObj['metaFeildschannel'].map((item) => (<MenuItem value={item} key={item}>{item}</MenuItem>))}

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
          {menuItemObj.hasOwnProperty('metaFeildsPaymentMethod') && menuItemObj['metaFeildsPaymentMethod'].map((item) => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
        </Select>
      </FormControl>
            <br></br>
            <br></br>

            <FormControl fullWidth >
        <InputLabel id="demo-simple-select-standard-label">Payment Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={paymentType}
          onChange={inputHandler}
          label="Payment Type"
          name="paymentType"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItemObj.hasOwnProperty('metaFeildsPaymentType') && menuItemObj['metaFeildsPaymentType'].map((item) => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
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
          {menuItemObj.hasOwnProperty('metaFeildsStatus') && menuItemObj['metaFeildsStatus'].map((item) => (<MenuItem value={item} key={item}>{item}</MenuItem>))}

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
            < div id="recNo">
            <FormControl >
        <InputLabel id="demo-simple-select-standard-label1">Select Number of Records</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={recordsLimitState}
          onChange={tableEntriesHandler}
          label="Number of Records per page"
        >
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
          <MenuItem value={"15"}>15</MenuItem>
          <MenuItem value={"20"}>20</MenuItem>
        </Select>
      </FormControl>
      </div>
            <br></br>
            <br></br>
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
        <div><ErrorPage/><Footer/></div>

      )}
    </>
  );
};
export default Dashboard;
