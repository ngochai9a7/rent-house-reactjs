import React from "react";
import Header from "./global-components/Header";
import SimpleBreadcrumbs from "./global-components/SimpleBreadcrumbs";
import usePagination from "./shop-components/Pagination";
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase";
import { Link } from "react-router-dom";
import NewsCard from "./news-components/NewsCard";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
function News() {
  const firebase = useFirebase();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    firebase.getAllBlog().then((blog) => setBlog(blog.docs));
  }, []);
  //data.sort((a, b) => a.id - b.id); // sort data by id
  // tinh so page
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(blog.length / PER_PAGE);
  const _DATA = usePagination(blog, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const { i18n, t } = useTranslation(["News"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  return (
    <div className="News">
      <Header />
      <SimpleBreadcrumbs title="Tin tức" />
      <Link to="/createblog">
        <Button
          size="small"
          variant="outlined"
          style={{
            backgroundColor: "#ff5a3c",
            borderRadius: 0,
            marginLeft: "12vw",
            marginTop: "10vh",
          }}
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
            {t("create")}
          </Typography>
        </Button>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 3,
          m: 1,

          marginBlock: 7,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {_DATA.currentData().map((blog) => {
          return (
            <NewsCard
              date={blog.data().createdAt.toDate().toDateString()}
              heading={blog.data().title}
              body={blog.data().description}
              id={blog.id}
              key={blog.id}
            ></NewsCard>
          );
        })}
      </Box>
      {/* <Pagination
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
      /> */}
      <Discover />
      <Footer />
    </div>
  );
}
export default News;
