import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loginContext } from "../../App";
import "./login.styles.css";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(loginContext);

  const inputHandler = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const checkCredentials = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      setInvalidCredentialsMessage("Please enter your credentials");
      return;
    }

    //checking credentials
    axios
      .post("http://localhost:3300/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.status);
          setInvalidCredentialsMessage("Invalid Credentials");
        } else {
          dispatch({
            type: "LOGIN",
            payload: { username: username },
          });
          sessionStorage.setItem("activeUsername", username);
          sessionStorage.setItem("isLoggedIn", true);
          sessionStorage.setItem("accessToken", response.data.token);
          sessionStorage.setItem("refreshToken", response.data.refreshtoken);
          navigate("/dashboard");
        }
      });
  };

  const bgStyle = { padding: 0 };
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "10% auto",
    borderRadius: "1.5rem",
  };
  const avatarStyle = { backgroundColor: "#357cc1 " };
  const textFieldStyle = { margin: "15px auto", borderRadius: "1rem" };
  const buttonStyle = {
    margin: "40px auto",
    borderRadius: "1rem",
    backgroundColor: "#357cc1",
  };
  return (
    <Grid id="main-container-loginpage" style={bgStyle}>
      <Paper id="loginBox" elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {" "}
            <LockRoundedIcon />{" "}
          </Avatar>{" "}
          <h2> Login </h2>{" "}
        </Grid>{" "}
        <form onSubmit={checkCredentials}>
          <TextField
            className="standard-basic"
            style={textFieldStyle}
            label="Username"
            variant="standard"
            fullWidth
            required={true}
            value={username}
            onChange={inputHandler}
            placeholder="Username"
            name="username"
          />
          <TextField
            className="standard-basic"
            style={textFieldStyle}
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            required={true}
            value={password}
            onChange={inputHandler}
            placeholder="Password"
            name="password"
          />
          <div className="errorMSG"> {invalidCredentialsMessage} </div>{" "}
          <Button
            type="submit"
            value="Submit"
            variant="contained"
            size="medium"
            fullWidth
            style={buttonStyle}
          >
            {" "}
            Login{" "}
          </Button>{" "}
        </form>{" "}
      </Paper>{" "}
    </Grid>
  );
};
export default Login;
