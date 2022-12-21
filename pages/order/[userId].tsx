import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Header from "../../container/Header";
import { useStore } from "../../store";
import TableOrder from "../../container/Order/TableListOrder";
import { toast } from "react-toastify";

const OrderPage = () => {
  const router = useRouter();
  const [numberOfOrder, setNumberOfOrder] = React.useState(0);
  const {
    listOrder,
    isSuccess,
    success,
    setIsSuccess,
    isError,
    errorMessage,
    setIsError,
  } = useStore();

  useEffect(() => {
    setNumberOfOrder(listOrder.length);
  }, [listOrder]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(success, {
        position: "top-center",
      });
    }
    setIsSuccess(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
    setIsError(false);
  }, [isError]);
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
        <TableOrder />
      </Box>
    </Box>
  );
};

export default OrderPage;
