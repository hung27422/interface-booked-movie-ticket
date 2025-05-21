import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MovieIcon from "@mui/icons-material/Movie";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function DrawerNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    { href: "/", icon: <ConfirmationNumberIcon />, label: "Đặt vé" },
    { href: "/", icon: <LocationOnIcon />, label: "Rạp" },
    { href: "/", icon: <MovieIcon />, label: "Phim" },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: "rgba(0, 0, 0, 0.9)",
        height: "100%",
        color: "white",
        borderRight: "2px solid #00eaff",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {navItems.map((item, index) => (
        <Link href={item.href} key={index} passHref>
          <Box component="a" sx={style}>
            {item.icon}
            <Typography>{item.label}</Typography>
          </Box>
          <Divider sx={{ bgcolor: "#00eaff" }} />
        </Link>
      ))}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: "red" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="left">
        {DrawerList}
      </Drawer>
    </div>
  );
}

const style = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  py: 2,
  px: 1,
  borderRadius: 1,
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    color: "#00eaff", // nền nhẹ khi hover
    transform: "translateX(5px)",
  },
  "&:active": {
    color: "#00eaff", // hiệu ứng khi click
  },
};
