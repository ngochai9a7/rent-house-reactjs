import Header from "./global-components/Header";
import BlogTitle from "./detail-blog-components/BlogTitle";
import Date from "./detail-blog-components/Date";
import { convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { EditorState, Editor } from "draft-js";
import ReactDOM from 'react-dom/client'
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
import { useParams } from "react-router-dom";
import SimpleBreadcrumbs from "../components/global-components/SimpleBreadcrumbs";
import { createContext, useState } from "react";
import { useFirebase, db } from "../firebase";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  onSnapshot,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { Typography } from "@mui/material";
import purify from "dompurify";

export const BlogContext = createContext();
function DetailBlog() {
  const [data, setData] = useState();
  const [idBlog, setIdBlog] = useState();
  
  const { id } = useParams();
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getBlogById(id).then((value) => {
      setData(value.data());
      setIdBlog(value.id);
    });
  }, []);
  if (data == null) return null;
  
  const contentState = convertFromRaw(data.editorState)
  const markup = draftToHtml(data.editorState)
  const content = EditorState.createWithContent(contentState)
  console.log(markup)
  return (
    <BlogContext.Provider value={{ data, id }}>
      <div className="DetailPage">
        <Header />
        <div className="col-8 container " style={{marginBottom: '20vh'}}>
          <div className=" row">
            <Date />
            <BlogTitle />
            <div dangerouslySetInnerHTML={{__html: purify.sanitize(markup)}}></div>
            <Typography sx={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>{data.user_name}</Typography>
          </div>
          {/* End row */}
        </div>
        {/* End container*/}
        <Discover />
        <Footer />
      </div>
    </BlogContext.Provider>
  );
}
export default DetailBlog;
