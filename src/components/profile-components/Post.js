import "../../assets/sass/shop/Item.scss";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Link, Navigate, useNavigate } from "react-router-dom";


import { Box } from "@mui/system";
import { Button } from "@mui/material";
import NumberFormat from 'react-number-format';
export default function Post({ id ,name, address, price, area, image }) {
    const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "8vh"
      }}
    >
      <Link to={`/detail/${id}`} key={id}>
        <Card
          className="card"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
            minHeight: "200px",
            minWidth: 368,
            marginBottom: 3,
            marginRight: "1.48rem",
            marginLeft: "auto",
          }}
        >
          <CardCover>
            <img className="img" src={image} alt="" />
          </CardCover>
          <CardCover sx={{}} />
          <CardContent sx={{ justifyContent: "flex-end" }}>
          </CardContent>
        </Card>
      </Link>
      <Box>
        <h4 style={{marginBottom: 15}}>{name}</h4>
        <Typography
          level="h2"
          fontSize="lg"
          textColor="#ff5a3c"
          mb={2}
          fontWeight="bold"
        >
          <NumberFormat value={price} displayType={'text'} thousandSeparator={"."}
                  decimalSeparator={","}/>đ/tháng
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="black"
          mb={2}
        >
          {address}
        </Typography>
        <Typography>
            Diện tích: <Typography level="h2" fontSize="lg" textColor="#ff5a3c" mb={3}  fontWeight="bold">{area}/m<sup>2</sup></Typography>
        </Typography>
        <Button onClick={() => navigate(`/detail/${id}`)} sx={{marginTop: "3vh"}} variant="contained">Read more</Button>
      </Box>
    </Box>
  );
}
