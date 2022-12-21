import { Badge, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoPic from "../../public/img/logo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { useStore } from "../../store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = ({ numberOfOrder }: any) => {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useStore();
  const [logged, setLogged] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    router.push("/");
  };
  useEffect(() => {
    if (isLoggedIn) {
      setLogged(true);
    }
  }, [isLoggedIn]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.6rem 3.2rem",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src={logoPic}
          alt="Picture of the logo"
          style={{
            borderRadius: "10px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            paddingLeft: "1.6rem",
            fontSize: "2.4rem",
            color: "#48362e",
          }}
        >
          Books.
        </Typography>
      </Box>
      {/* Avatar user */}
      {!logged && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              fontSize: "1.6rem",
              backgroundColor: "#f1eeff",
              color: "#6c5dd4",
              padding: " 1rem 2rem",
              fontWeight: "600",
              cursor: "pointer",
              borderRadius: "10px",
              marginRight: "2.4rem",
              textTransform: "none",
            }}
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1rem 2.4rem",
              borderRadius: "10px",
              backgroundColor: "#6c5dd4",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={() => router.push("/register")}
          >
            <AccountCircleIcon
              style={{
                fontSize: "2.4rem",
              }}
            />
            <Typography
              sx={{
                fontSize: "1.6rem",
                paddingLeft: "1.2rem",
              }}
            >
              Sign up
            </Typography>
          </Button>
        </Box>
      )}
      {logged && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Badge
            badgeContent={numberOfOrder}
            color="primary"
            sx={{
              "& span": {
                fontSize: "1.2rem",
              },
            }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: "3rem",
                color: "#6c5dd4",
                cursor: "pointer",
              }}
              onClick={() => router.push(`/order/${user._id}`)}
            />
          </Badge>

          <Box
            component="div"
            id="imageAccount"
            onClick={handleClick}
            sx={{
              marginLeft: "3rem",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1671129823992-bd867dba6b12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              width={50}
              height={50}
              style={{
                borderRadius: "1rem",
                objectFit: "cover",
              }}
            />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "imageAccount",
            }}
            sx={{
              "& li": {
                fontSize: "1.6rem",
              },
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Header;
