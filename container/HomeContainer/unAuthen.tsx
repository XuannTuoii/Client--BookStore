import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useStore } from "../../store";
import Header from "../Header";
import ContenHome from "./contenHome";

// import  "swiper/scss";
// import "swiper/scss/navigation";
// import "swiper/scss/pagination";

//when user not logged in
const HomepageUnloggedIn = ({ listBookData }: any) => {
  const { isLoggedIn } = useStore();

  return (
    <Box
      sx={{
        backgroundColor: "#f3e5d0",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e7e6dd",
          maxWidth: "1500px",
          padding: "2rem 6rem",
          paddingBottom: "6rem",
          margin: " auto",
          borderRadius: "1rem",
        }}
      >
        <Header />
        {/* Content */}
        <ContenHome listBookData={listBookData} />
      </Box>
    </Box>
  );
};

export default HomepageUnloggedIn;
