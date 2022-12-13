function HighVoteItem({ data }) {
  return (
    <div className="highvoteitem">
      <div className="vote-item">
        <div className="image-box">
          <img src={data.image[0]} alt="" />
        </div>
        <div className="item-content">
          <p>{data.name}</p>
          <small>{data.price}/tháng</small>
        </div>
      </div>
    </div> /* End fragment */
  );
}

export default HighVoteItem;
