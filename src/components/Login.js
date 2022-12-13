import React from "react";
import Header from "./global-components/Header";
import Carousel from "./section-components/Carousel";
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
import {useNavigate} from 'react-router-dom'
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from '@mui/icons-material/Facebook';
import {lightBlue} from "@mui/material/colors"
import { Box } from "@mui/system";
import {useFirebase} from "../firebase";
import { useEffect } from "react";
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton, GithubLoginButton, LinkedInLoginButton } from "react-social-login-buttons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function Login() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);
  const { i18n, t } = useTranslation(["login"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="Login">
      <Header />
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}    
      >
        <Typography mt={3} mb={3}>
          {t("login")}
        </Typography>
        <GoogleLoginButton style={{width: '20%', marginBottom: '3vh'}} onClick={firebase.signinWithGoogle} />
        <FacebookLoginButton style={{width: '20%', marginBottom: '3vh'}} onClick={firebase.signinWithFacebook} />
        <TwitterLoginButton style={{width: '20%', marginBottom: '3vh'}} onClick={firebase.signinWithTwitter} />
        <GithubLoginButton style={{width: '20%', marginBottom: '3vh'}} onClick={firebase.signinWithGoogle} />
        
        
        
      </Box>
      <Discover/>
      <Footer />
      
    </div>
  );
}
export default Login;
