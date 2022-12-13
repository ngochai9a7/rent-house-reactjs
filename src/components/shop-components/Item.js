import "../../assets/sass/shop/Item.scss";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

export default function Item({ name, image, price }) {
 
  return (
    <Card
      className="card"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "281px",
        minWidth: 368,
        marginBottom: 3,
        marginRight: '1.48rem',
        marginLeft: 'auto',
      }}
    >
      <CardCover>
        <img className="img" src={image} alt="" />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography
          level="h2"
          fontSize="lg"
          textColor="#ff5a3c"
          mb={1}
          fontWeight="bold"
        >
          {price}/tháng
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
