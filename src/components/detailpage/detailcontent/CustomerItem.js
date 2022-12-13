import avatar1 from "../../../assets/image-custom/avatar1.png";

function CustomerItem({ cmt }) {
  return (
    <div className="customer-item">
      <div className="context">
        <img style={{width: '6%', height: '6%'}} src={cmt.img} alt="" />
        <div className="content">
          <div className="info">
            <h1>{cmt.name}</h1>
            <span>{cmt.date.toDate().toDateString()}</span>
          </div>
          <p>{cmt.comment}</p>
        </div>
      </div>
      {/* end col context */}
    </div>
    /*  end customer-item */
  );
}

export default CustomerItem;
