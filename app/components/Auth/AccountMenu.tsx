import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Context
  const { authState, logout } = React.useContext(AuthContext);

  const name = authState.user?.fullName;
  const words = name?.split(" "); // ["Hồ", "Tấn", "Hùng"]
  const lastWord = words && words[words.length - 1]; // "Hùng"
  const firstLetter = lastWord?.charAt(0); // "H"

  const handleLogout = async () => {
    await logout();
    await handleClose();
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Cài đặt">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="ml-3 rounded-full size-10 tech-border cursor-pointer">
              <div className="flex flex-col items-center justify-center ">
                <span className="text-2xl font-bold text-red-500 text-center">{firstLetter}</span>
              </div>
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
              border: "2px solid #00eaff", // Thêm viền
              borderRadius: "10px",
              boxShadow: "0 0 3px #00eaff, 0 0 3px #7d2aff",
              transition: "all 0.3s ease-in-out",
              backgroundColor: "#121212", // Màu nền tối như TextField
              color: "#fff",
              borderBottom: "1px solid #ccc",
              "&:hover": {
                borderColor: "#7d2aff",
                boxShadow: "0 0 6px #00eaff, 0 0 6px #7d2aff",
              },
              "&:focus-within": {
                borderColor: "#ffffff",
                boxShadow: "0 0 10px #00eaff, 0 0 10px #7d2aff, 0 0 12px #ffffff",
                transform: "scale(1.02)",
              },
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar>{firstLetter}</Avatar> Thông tin
        </MenuItem>

        <Divider color="#ccc" />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout color="info" fontSize="small" />
          </ListItemIcon>
          Đăng Xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
