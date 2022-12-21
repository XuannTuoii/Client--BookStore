import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useStore } from "../../store";
import Header from "../Header";
import ContenHome from "./contenHome";

//when user logged in
const HomeContainer = ({ listBookData }: any) => {
  const { getAllOrder, listOrder, user } = useStore();
  const [numberOfOrder, setNumberOfOrder] = React.useState(0);
  useEffect(() => {
    getAllOrder({
      id: user._id,
    });
  }, []);

  useEffect(() => {
    setNumberOfOrder(listOrder.length || 0);
  }, [listOrder]);

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
          maxWidth: "1400px",
          padding: "4rem 4rem 8rem 4rem",
          margin: " auto",
          borderRadius: "2rem",
        }}
      >
        <Header numberOfOrder={numberOfOrder} />
        <ContenHome listBookData={listBookData} />
      </Box>
    </Box>
  );
};

export default HomeContainer;
