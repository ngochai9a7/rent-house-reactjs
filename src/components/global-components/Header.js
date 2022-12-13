import logo from "../../assets/image-custom/logo-new.png";
import { Link } from "react-router-dom";
import "../../assets/sass/global/Header.scss";
import { HomeContext } from "../Main";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { useFirebase } from "../../firebase";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect } from "react";

function Header() {
  const firebase = useFirebase();
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  const renderButton = () => {
    if (!firebase.user) return <Link to="/login">{t("login")}</Link>;
    else if (firebase.user && !firebase.user.phoneNumber)
      return <Link to="/">{t("addlisting")}</Link>;
    else if (firebase.user && firebase.user.phoneNumber)
      return <Link to="/addlisting">{t("addlisting")}</Link>;
  };
  

  return (
    <>
      {/* Logged in */}
      {firebase.user && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#0B2C3D",
          }}
        >
          {/* Name */}
          <Link to="/profile">
            <Typography
              sx={{
                fontFamily: "Montserrat",
                textDecoration: "none",
                color: "#fff",
              }}
              mr={3}
              color="white"
            >
              {t("welcome")} {firebase.user.displayName}
            </Typography>
          </Link>
          {/* Language button */}

          {/* Signout button */}
          <Button
            size="small"
            variant="outlined"
            style={{
              backgroundColor: "#ff5a3c",
              borderRadius: 0,
            }}
            onClick={firebase.signout}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                textDecoration: "none",
                color: "#fff",
                margin: "auto",
              }}
              mr={3}
              color="white"
            >
              {t("signout")}
            </Typography>
          </Button>
        </Box>
      )}
      {/* --------------------------- */}

      <div className="navBarContainer">
        <nav className="navbar navbar-expand-lg navbar-light  fixed-top">
          <div className="container">
            <Link to="/">
              <img className="logo" src={logo} alt="logo"></img>
            </Link>
            <button
              className="navbar-toggler hidden-lg-up"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav  mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to="/" style={{whiteSpace: 'nowrap'}}>{t("home")}</Link>
                </li>
                <li className="nav-item">
                  <a className="" href="#" style={{whiteSpace: 'nowrap'}}>
                    {t("about")}
                  </a>
                </li>

                <li className="nav-item">
                  <Link to="/shop2" style={{whiteSpace: 'nowrap'}}>{t("shop")}</Link>
                </li>

                <li className="nav-item">
                  <Link to="/news" style={{whiteSpace: 'nowrap'}}>{t("news")}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" style={{whiteSpace: 'nowrap'}}>{t("contact")}</Link>
                </li>
                <li className="nav-item">
                  <div className="button">{renderButton()}</div>
                </li>
                <Select
                  sx={{
                    backgroundColor: "white",
                    height: "50%",
                    marginRight: "3vh",
                  }}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={localStorage.getItem("i18nextLng")}
                  label="Lang"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="vi">Tiếng Việt</MenuItem>
                </Select>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
    /* End fragment */
  );
}
export default Header;
