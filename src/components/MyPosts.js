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
import Post from "./profile-components/Post";
import usePagination from "./shop-components/Pagination";
import { Pagination } from "@mui/material";
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
function MyPosts() {
  const [number, setNumber] = useState();
  const firebase = useFirebase();
  const [data, setData] = useState([]);
  useEffect(() => {
    firebase.getAllHouses().then((houses) => {
      setData(houses.docs);
    });
  }, []);
  const result = data.filter((x) => x.data().user_uid === firebase.user.uid);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(result.length / PER_PAGE);
  const _DATA = usePagination(result, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className="MyPosts">
      <Header />
      <Box
        sx={{
          bgcolor: "#f0fafc",
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
                          color: "#0d6efd",
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
                      style={{
                        textDecoration: "none",
                        color: "black",
                        "&:hover": {
                          color: "#0d6efd",
                        },
                      }}
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
                      Bài viết của bạn
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
                  {/* Post */}
                  {_DATA.currentData().map((house) => {
                    return (
                      <Post
                        id={house.id}
                        key={house.id}
                        name={house.data().name}
                        address={house.data().address}
                        image={house.data().image[0]}
                        price={house.data().price}
                        area={house.data().area}
                      ></Post>
                    );
                  })}
                  <Pagination
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                    color="primary"
                  />
                  {/* End Post */}
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
export default MyPosts;
