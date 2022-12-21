import { Box, Typography } from "@mui/material";
import React from "react";
import ConvertTime from "./convertTime";
import TableListOrder from "./TableListOrder";

const OrderDetail = () => {
  return (
    <Box
      sx={{
        paddingTop: "6rem",
      }}
    >
      {/* Table */}
      <TableListOrder />
    </Box>
  );
};

export default OrderDetail;
