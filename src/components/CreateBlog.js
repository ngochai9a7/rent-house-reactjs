import React from "react";
import Header from "./global-components/Header";
import SimpleBreadcrumbs from "./global-components/SimpleBreadcrumbs";
import { Pagination } from "@mui/material";
import usePagination from "./shop-components/Pagination";
import { Container } from "react-bootstrap";
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
import "../assets/sass/global/Header.scss";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase";
import { Timestamp } from "firebase/firestore";

import { Link } from "react-router-dom";
import NewsCard from "./news-components/NewsCard";
import { Box, Button, Typography, TextField } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function CreateBlog() {
  const firebase = useFirebase();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setData({
      ...data,
      title: title,
      description: description,
      editorState: convertToRaw(editorState.getCurrentContent()),
    });
  };
  // console.log(convertToRaw(editorState.getCurrentContent()));
  const [data, setData] = useState({
    title: "",
    description: "",
    createdAt: Timestamp.now().toDate(),
    user_img: firebase.user.photoURL,
    user_name: firebase.user.displayName,
    user_phone: firebase.user.phoneNumber,
    user_uid: firebase.user.uid,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({
      ...data,
      title: title,
      description: description,
      editorState: convertToRaw(editorState.getCurrentContent()),
    });
    console.log(data);
    await firebase.handleCreateNewBlog(data);
  };
  return (
    <div className="CreateBlog">
      <Header />
      <SimpleBreadcrumbs title="Tạo blog" />
      <Box
        sx={{
          display: "flex",
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
        <TextField
          name="name"
          required
          fullWidth
          id="name"
          label="Tiêu đề"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            marginBottom: "2vh",
          }}
        />
        <TextField
          required
          fullWidth
          name="description"
          label="Mô tả ngắn"
          id="description"
          multiline
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            marginBottom: "2vh",
          }}
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#ff5a3c",
          marginLeft: "12vw",
          marginTop: "10vh",
          marginBottom: "10vh",
        }}
        onClick={handleSubmit}
      >
        <Typography sx={{ fontFamily: "Montserrat" }}>Đăng bài</Typography>
      </Button>
      <Discover />
      <Footer />
    </div>
  );
}
