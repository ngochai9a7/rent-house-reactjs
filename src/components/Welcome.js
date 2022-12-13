import React, { useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  PhoneAuthCredential,
} from "firebase/auth";
import { useFirebase } from "../firebase";
import { useState } from "react";
import Header from "./global-components/Header";
import { Container, Paper, Typography, Box, Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Item from "./shop-components/Item";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
function Welcome() {
  const [number, setNumber] = useState();
  const handleChange = (e) => {
    setNumber(e.target.value);
  };
  const firebase = useFirebase();
  console.log(firebase.user);
  return (
    <div className="Welcome">
      <Header />
      <Box
        sx={{
          bgcolor: "#f0fafc",
          height: "100vh",
        }}
      >
        <Container mt={3}>
          <Grid container>
            {/* Paper ben trai */}
            <Grid item xs={12} lg={3} mt={3}>
              <Paper
                elevation={3}
                sx={{ paddingBottom: "4rem", paddingTop: "2rem" }}
              >
                <Typography
                  sx={{
                    paddingLeft: "2rem",
                    marginBottom: "2rem",
                    fontFamily: "Montserrat",
                    opacity: "0.8",
                  }}
                >
                  Dashboard
                </Typography>
                <Box
                  sx={{
                    paddingLeft: "2rem",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Montserrat",
                    marginBottom: "1rem",
                  }}
                >
                  <Box>
                    <PostAddIcon sx={{ marginRight: "10px" }}></PostAddIcon>
                    <Link
                      to="/myposts"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        "&:hover": {
                          color: '#0d6efd',
                        },
                        
                      }}
                    >
                      View Posts
                    </Link>
                  </Box>
                </Box>
                <Box
                  sx={{
                    paddingLeft: "2rem",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Montserrat",
                  }}
                >
                  <Box>
                    <AccountBoxIcon
                      sx={{ marginRight: "10px" }}
                    ></AccountBoxIcon>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "black", "&:hover": {
                        color: '#0d6efd',
                      }, }}
                    >
                      View Profile
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            {/* End Paer ben trai */}
            {/* Paper ben phai */}
            <Grid item xs={12} lg={9} pl={3} pt={3}>
              <Box>
                {/* First line */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon fontSize="large" />
                    <h4 style={{ marginBottom: 0, marginLeft: "0.5rem" }}>
                      Xem thông tin cá nhân
                    </h4>
                  </Box>
                  <Link to="/">
                    <Button variant="outlined" color="error">
                      <KeyboardBackspaceIcon />
                      Quay về trang chủ
                    </Button>
                  </Link>
                </Box>
                {/* End First Line */}

                {/* Info */}
                <Paper
                  elevation={1}
                  sx={{
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "1.75rem",
                    paddingRight: "1.5rem",
                  }}
                >
                  {/* Avatar */}
                  <Avatar
                    alt="avatar"
                    src={firebase.user.photoURL}
                    sx={{ width: 56, height: 56, marginBottom: "24px" }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Name */}
                  <Typography sx={{ fontFamily: "Montserrat" }}>
                    Tên: {firebase.user.displayName}
                  </Typography>
                  {/* Email */}
                  <Typography sx={{ fontFamily: "Montserrat" }}>
                    Email: {firebase.user.email}
                  </Typography>
                  {/* No phone number */}
                  {!firebase.user.phoneNumber && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1.5rem",
                      }}
                    >
                      <TextField
                        size="small"
                        id="outlined-basic"
                        label="Số điện thoại"
                        variant="outlined"
                        sx={{ marginRight: "1rem" }}
                        onChange={handleChange}
                      />
                      <div id="recaptcha-container"></div>
                      <Button
                        size="small"
                        variant="outlined"
                        style={{
                          backgroundColor: "#ff5a3c",
                          borderRadius: 0,
                        }}
                        onClick={() => firebase.phoneAuth(number)}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Montserrat",
                            color: "#fff",
                            margin: "auto",
                            textTransform: "none",
                          }}
                          color="white"
                        >
                          Xác thực
                        </Typography>
                      </Button>
                    </Box>
                  )}
                  {/* No phone number */}

                  {/* With phone number */}
                  {firebase.user.phoneNumber && (
                    <Typography sx={{ fontFamily: "Montserrat" }}>
                      Số điện thoại: {firebase.user.phoneNumber}{" "}
                      <VerifiedUser style={{ color: "green" }}></VerifiedUser>
                    </Typography>
                  )}
                  {/* End With phone number */}
                </Paper>
                {/* End Info */}
              </Box>
            </Grid>
            {/* End Paper ben phai */}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
export default Welcome;
