import avatar2 from "../../../assets/image-custom/avatar2.png";
import "../../../assets/sass/detailpage/SellerProfile.scss";
import {useContext} from 'react'
import {DetailContext} from "../../DetailPage"
function SellerProfile() {
  const context = useContext(DetailContext);
  
  return (
    <div className="seller-profile">
      <img src={context.data.user_img} alt="" />
      <h1>{context.data.user_name}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
        distinctio, odio, eligendi suscipit reprehenderit atque.
      </p>
      <div className="icon-group">
        <i className="fa-brands fa-facebook-f"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-youtube"></i>
      </div>
      <button className="btn btn-danger" >{context.data.user_phone}</button>
    </div> /* End fragment */
  );
}

export default SellerProfile;
