function LatestArticleItem({ data }) {
  
  return (
    <div className="latest-article-item">
      <div className="article-item">
        <div className="image-box">
          <img src={data.image[0]} alt="" />
        </div>
        <div className="item-content">
          <p>{data.name}</p>
          <small>{data.price} / tháng</small>
        </div>
      </div>
    </div> /* End fragment */
  );
}

export default LatestArticleItem;
