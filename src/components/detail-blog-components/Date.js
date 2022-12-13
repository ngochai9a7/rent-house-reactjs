import "../../assets/sass/detailpage/DateComment.scss"
import { useContext } from "react";
import { BlogContext } from "../DetailBlog" 
function Date() {
    const context = useContext(BlogContext);
  return (
    <div className="col-12 date-comment">
      <div className="date">
        <i className="fa-solid fa-calendar-days" />
        <p>{context.data.createdAt.toDate().toDateString()}</p>
      </div>
      
    </div>
    /* End col date-comment*/
  );
}
export default Date