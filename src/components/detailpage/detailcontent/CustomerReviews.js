import CustomerItem from "./CustomerItem";
import "../../../assets/sass/detailpage/CustomerReviews.scss";
import { DetailContext } from "../../DetailPage";
import { useState, useRef, useContext, useEffect } from "react";
import { useFirebase } from "../../../firebase";
import { Timestamp } from "firebase/firestore";
import  usePagination  from '../.././shop-components/Pagination'
import { Pagination } from "@mui/material";
function CustomerReviews() {
  const firebase = useFirebase();
  const context = useContext(DetailContext);
  const [comment, setComment] = useState([]); // comment from database
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    firebase.getComment(context.id).then((comment) => setComment(comment));
  }, [isSubmit]);
  // comment from form
  const [formData, setFormData] = useState({
    author_id: firebase.user.uid,
    img: firebase.user.photoURL,
    name: firebase.user.displayName,
    date: Timestamp.now().toDate(),
    comment: "",
  });
  const handleSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    await firebase.handleComment(formData, context.id);
    setFormData({ ...formData, comment: "" });
    setIsSubmit(false); // revert to original
  };
  // pagination comment
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(comment.length / PER_PAGE);
  const _DATA = usePagination(comment, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className="col-12 customer-reviews">
      <h1>Đánh giá khách hàng</h1>
      {comment !== undefined &&
        _DATA.currentData().map((cmt, index) => {
          return <CustomerItem key={index} cmt={cmt}></CustomerItem>;
        })}
      {comment !== undefined && (
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
      )}
      <form className="post-reviews">
        <h1>Nhận xét nơi ở</h1>
        <div className="form-text">
          <textarea
            className="text-reviews"
            placeholder="Gõ nhận xét ở đây .."
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            required
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-danger"
          style={{ marginTop: "10px" }}
        >
          Gửi
        </button>
      </form>
      {/* End form post-reviews*/}
    </div>
    /* End col customer-reviews*/
  );
}

export default CustomerReviews;
