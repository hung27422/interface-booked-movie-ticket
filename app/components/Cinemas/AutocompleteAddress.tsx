import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import addressCinemas from "@/app/utils/addressCinemas";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const selectStyles = {
  position: "relative",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  textTransform: "uppercase",
  transition: "all 0.3s ease-in-out",

  "& .MuiOutlinedInput-root": {
    border: "2px solid #00eaff",
    borderRadius: "10px",
    boxShadow: "0 0 3px #00eaff, 0 0 3px #7d2aff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      borderColor: "#7d2aff",
      boxShadow: "0 0 6px #00eaff, 0 0 6px #7d2aff",
    },
    "&.Mui-focused": {
      borderColor: "#ffffff",
      boxShadow: "0 0 10px #00eaff, 0 0 10px #7d2aff, 0 0 12px #ffffff",
      transform: "scale(1.02)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    color: "white",
    padding: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    backgroundColor: "#121212",
    padding: "0px 10px",
    borderRadius: "8px",
    border: "none",
    position: "absolute",
    fontSize: "0.5rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    transform: "translate(14px, 12px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
    border: "1px solid #00eaff",
    boxShadow: "0 0 2px #00eaff, 0 0 2px #7d2aff",
    transform: "translate(14px, -12px) scale(0.85)",
  },
};

export default function AutocompleteAddress() {
  const { selectedAutoCompletedAddress, setSelectedAutoCompletedAddress } = useAppContext();
  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%", ...selectStyles }}>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={selectedAutoCompletedAddress}
          input={<OutlinedInput label="Chọn địa điểm" />}
          MenuProps={MenuProps}
          sx={selectStyles}
          renderValue={() =>
            selectedAutoCompletedAddress ? (
              <Typography fontWeight="bold">{selectedAutoCompletedAddress}</Typography>
            ) : (
              <Typography color="#aaa">Chọn địa chỉ</Typography>
            )
          }
        >
          {addressCinemas.map((location) => (
            <MenuItem
              key={location.slug}
              value={location.slug}
              onClick={() => setSelectedAutoCompletedAddress(location.address)}
              sx={{
                color: "white",
                backgroundColor: "#1a1a1a", // 💡 Nền mặc định khi chưa selected
                "&:hover": {
                  backgroundColor: "#2c2c2c", // Hover khi chưa selected
                },
                "&.Mui-selected": {
                  backgroundColor: "#242424", // Nền khi đã selected
                  color: "#00eaff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#333", // Hover khi đã selected
                },
              }}
            >
              {location.address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
