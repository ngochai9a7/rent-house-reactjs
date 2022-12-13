import { useEffect, useState, useMemo } from "react";
import Header from "./global-components/Header";
import Footer from "./global-components/Footer";
import { Timestamp, } from "firebase/firestore";
import "../assets/sass/AddListingForm.scss";
import { useFirebase } from "../firebase";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/system";
import { Button, InputAdornment, Link } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import NumberFormat from "react-number-format";

import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
const axios = require("axios").default;

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#000000",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

function AddListingForm(props) {
  const firebase = useFirebase();
  //upload image
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ); 
        setFiles(files.concat(acceptedFiles)); // keep adding image to array
         
      },
    
    });
  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };
  const removeAll = () => {
    setFiles([]);
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // image preview
  const thumbs = files.map((file) => (
    <Box
      key={file.name}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={removeFile(file)}
      >
        Delete
      </Button>
    </Box>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  // form data
  const [formData, setFormData] = useState({
    address: "",
    area: 0,
    comments: [],
    createdAt: Timestamp.now().toDate(),
    description: "",
    detailsummary: "",
    image: [],
    latitude: "",
    longitude: "",
    name: "",
    price: 0,
    user_img: firebase.user.photoURL,
    user_name: firebase.user.displayName,
    user_phone: firebase.user.phoneNumber,
    user_uid: firebase.user.uid,
    view: 0,
  });
  
  // set state for image array
  useEffect(() => {
    setFormData({ ...formData, image: files });
  }, [files])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value ,image: files });
    
  };
  
  console.log(formData)
  // publish
  const handlePublish = async (e) => {
    const newArea = Number(formData.area)
    const newPrice = Number(formData.price.replace(/\./g,''))
    const newFormData = { ...formData, area: newArea, price: newPrice}
    var newFormData2
    
    const address = encodeURIComponent(formData.address);
    const url = `https://rsapi.goong.io/geocode?address=${address}&api_key=IJlMfJnO5RoqBr1ffRn9EzfRrxB6xFKak7eH71rA`
    axios({
      method: 'get',
      url: url,
      responseType: 'json'
    })
      .then(function (response) {
        const place = response.data.results[0]
        const lat = place.geometry.location.lat
        const lng = place.geometry.location.lng   
        newFormData2 = { ...newFormData, latitude: lat, longitude: lng };
      })
      .then(() => {
        console.log(formData)
        firebase.handleCreateNewListing(newFormData2)
      })
    /*Call API to get latitude and longitude
    const address = encodeURIComponent(formData.address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCTtfi6Lbe7WdnIEz82nc7MldETbQVg0og`;
      axios({
        method: 'get',
        url: url,
        responseType: 'json'
      })
        .then(function (response) {
          const place = response.data.results[0]
          const lat = place.geometry.location.lat
          const lng = place.geometry.location.lng
          setFormData({ ...formData, latitude: lat, longitude: lng });
        });
    */
  }
  return (
    <div className="AddListingForm">
      <Header />
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontFamily: "Montserrat" }}
          >
            Đăng thông tin nơi ở
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Tên nơi ở"
                  autoFocus
                  onChange={(e) => handleChange(e)}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  id="area"
                  label="Diện tích"
                  name="area"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">/m<sup>2</sup></InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <NumberFormat
                  customInput={TextField}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  required
                  fullWidth
                  id="price"
                  label="Giá"
                  name="price"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">/tháng</InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Địa chỉ"
                  id="address"
                  onChange={(e) => handleChange(e)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="detailsummary"
                  label="Tiện nghi"
                  id="detailsummary"
                  multiline
                  rows={5}
                  onChange={(e) => handleChange(e)}

                />
              </Grid>
              <Grid item xs={12}>
                <section className="container">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} name="image"  />
                    <p style={{ color: "blue" }}>
                      Kéo thả ảnh vào đây hoặc click vào để tải ảnh lên
                    </p>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Mô tả chi tiết"
                  id="description"
                  multiline
                  rows={10}
                  onChange={(e) => handleChange(e)}

                />
              </Grid>
            </Grid>
            <Button
              onClick={handlePublish}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#ff5a3c",
              }}
            >
              <Typography sx={{ fontFamily: "Montserrat" }}>Đăng bài</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </div>
  );
}

export default AddListingForm;
