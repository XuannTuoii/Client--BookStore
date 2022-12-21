import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BookDetail from "../../container/Book";
import Header from "../../container/Header";
import { useStore } from "../../store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";

const Book = () => {
  const router = useRouter();
  //state
  const { getAllOrder, listOrder, user } = useStore();
  const [numberOfOrder, setNumberOfOrder] = React.useState(0);

  useEffect(() => {
    getAllOrder({
      id: user._id,
    });
  }, []);

  useEffect(() => {
    setNumberOfOrder(listOrder.length);
  }, [listOrder]);

  return (
    <Box
      sx={{
        backgroundColor: "#f3e5d0",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      {/* Icon back */}
      <ArrowBackIcon
        sx={{
          fontSize: "3rem",
          cursor: "pointer",
          position: "absolute",
          top: "4rem",
          left: "1rem",
          color: "#000",
        }}
        onClick={() => router.back()}
      >
        Back
      </ArrowBackIcon>
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
        <Header numberOfOrder={numberOfOrder} />
        {/* Content */}
        <BookDetail />
      </Box>
    </Box>
  );
};

export default Book;
