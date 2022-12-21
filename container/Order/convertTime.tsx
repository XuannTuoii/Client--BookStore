import React from "react";
import { Box } from "@mui/material";

const ConvertTime = (dateRecive: any) => {
  console.log("dateRecive", dateRecive);

  function timeChange() {
    const dateNow = new Date().getTime();
    const date = new Date(dateRecive).getTime();
    const delta = dateNow - date;

    const years = Math.floor(delta / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(delta / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);

    if (years > 1) {
      return Math.floor(years) + " years";
    }
    if (months > 1) {
      return Math.floor(months) + " months";
    }

    if (days > 1) {
      return Math.floor(days) + " days";
    }
    if (hours > 1) {
      return Math.floor(hours) + " hours";
    }
    if (minutes > 1) {
      return Math.floor(minutes) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  return <Box>{timeChange()} ago</Box>;
};

export default ConvertTime;
