import React, { useContext } from "react";
import "../../assets/sass/detailpage/TitleContent.scss";
import { BlogContext } from "../DetailBlog" 
function BlogTitle() {
  const context = useContext(BlogContext);
  return (
    <div className="col-12 title-content">
      <h1>{context.data.title}</h1>
    </div>
    /* End col title-content*/
  );
}

export default BlogTitle;
