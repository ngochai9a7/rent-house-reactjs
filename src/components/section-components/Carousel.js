import a from "../../assets/image-custom/1.png";
import b from "../../assets/image-custom/2.png";
import c from "../../assets/image-custom/3.png";
import "../../assets/sass/section/Carousel.scss";
import Modal from 'react-modal';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
//styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
function Carousel() {
  const { i18n, t } = useTranslation(["main"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const [modal, setModal] = useState(false);
  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }
  return (
    <div className="Carousel">
      <div className="container-fluid mt-3 container-carousel">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="carousel-item active carousel-main"
              data-bs-interval={100000}
            >
              <div className="row slide-item">
                <div className="col-6 content-around">
                  <div className="content">
                    <p className="carousel-title">Ngoc Hai Agency</p>
                    <h1 className="mainText">
                      Find Your <span style={{ color: "#ff5a3c" }}>Dream</span>{" "}
                      House
                    </h1>
                    <div className="summary">
                      {t("infoline1")} <br />
                      {t("infoline2")}
                      <br />
                      {t("infoline3")}
                    </div>
                    <div className="control">
                      <button>{t("seemore")}</button>
                      <a onClick={openModal} style={{'&:hover': {cursor: 'pointer'}}}>
                        <i className="fa-solid fa-play" style={{cursor: 'pointer'}}  />
                      </a>
                      
                      <Modal
                        isOpen={modal}
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <iframe width="700" height="393.75" src="https://www.youtube.com/embed/R03CHOiPrkY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </Modal>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <img src={a} className="d-block w-100" alt="carousel1.jpg" />
                </div>
              </div>
            </div>
            {/* End carouselItem */}
            <div className="carousel-item">
              <div className="row slide-item">
                <div className="col-6 content-around">
                  <div className="content">
                    <p className="carousel-title">Ngoc Hai angular</p>
                    <h1 className="mainText">
                      Find Your <span style={{ color: "#ff5a3c" }}>Dream</span>{" "}
                      House
                    </h1>
                    <div className="summary">
                      Kênh thông tin tìm nhà ở số 1 VN <br />
                      Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn
                      hộ
                      <br />
                      Chuyên trang bất động sản số 1 VN
                    </div>
                    <div className="control">
                      <button>See more</button>
                      <i className="fa-solid fa-play" />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <img src={b} className="d-block w-100" alt="carousel2.jpg" />
                </div>
              </div>
            </div>
            {/* End carouselItem */}
            <div className="carousel-item">
              <div className="row slide-item">
                <div className="col-6 content-around">
                  <div className="content">
                    <p className="carousel-title">Ngoc Hai angular</p>
                    <h1 className="mainText">
                      Find Your <span style={{ color: "#ff5a3c" }}>Dream</span>{" "}
                      House
                    </h1>
                    <div className="summary">
                      Kênh thông tin tìm nhà ở số 1 VN <br />
                      Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn
                      hộ
                      <br />
                      Chuyên trang bất động sản số 1 VN
                    </div>
                    <div className="control">
                      <button>See more</button>
                      <i className="fa-solid fa-play" />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <img src={c} className="d-block w-100" alt="carousel3.jpg" />
                </div>
              </div>
            </div>
            {/* End carouselItem */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* End carousel */}
      </div>
      {/* End container */}
    </div>
    /* End fragment */
  );
}
export default Carousel;
