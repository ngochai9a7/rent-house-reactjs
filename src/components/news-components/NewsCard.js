import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function NewsCard({ date, heading, body, id }) {
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 800,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "2vh",
      }}
    >
      <Link to={`/news/${id}`}>
        <CardMedia
          component="img"
          sx={{
            width: '150px',
            height: '150px',
          }}
          image="https://images.unsplash.com/photo-1507833423370-a126b89d394b?crop=entropy&auto=format&fit=crop&w=3387"
          alt="Paella dish"
        />
      </Link>
      <CardContent>
        <Link to={`/news/${id}`}>
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
            level="h2"
            fontSize="lg"
            id="card-description"
            mb={0.5}
          >
            {heading}
          </Typography>
        </Link>
        <Typography
          sx={{ color: "black", fontWeight: 350, fontFamily: "Montserrat" }}
          fontSize="12px"
          aria-describedby="card-description"
          mb={1}
        >
          {date}
        </Typography>
        <Typography
          sx={{ color: "black", fontFamily: "Arial", fontWeight: 150 }}
          fontSize="12px"
          aria-describedby="card-description"
          mb={1}
        >
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
