import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme, useMediaQuery, MenuItem, Typography } from "@mui/material";
import useCinemas from "../hooks/useCinemas";
import { useAppContext } from "../contexts/AppContextProvider/AppContextProvider";
import LoaderSpinner from "./LoaderSpinner";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      backgroundColor: "#1a1a1a",
      color: "#fff",
    },
  },
};

const selectStyles = {
  color: "white",
  borderRadius: "10px",
  border: "1px solid #00eaff",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#00eaff",
    },
    "&:hover fieldset": {
      borderColor: "#7d2aff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
      boxShadow: "0 0 10px #00eaff, 0 0 10px #7d2aff",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
    padding: "4px",
  },
};

export default function SearchCinemasInput() {
  const { selectedAddress, cinemaIDSelected, setCinemaIDSelected } = useAppContext();
  const { dataCinemaByLocation } = useCinemas({ location: selectedAddress ?? "" });
  const [open, setOpen] = React.useState(false);
  const [selectedCinemaName, setSelectedCinemaName] = React.useState("");

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleSelectCinema = (cinemaId: string, cinemaName: string) => {
    setCinemaIDSelected(cinemaId);
    setSelectedCinemaName(cinemaName);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <FormControl sx={{ m: 1, width: isTablet ? "100%" : 360, ...selectStyles }}>
      <Select
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        displayEmpty
        value={cinemaIDSelected || ""}
        onChange={() => {}}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        renderValue={() =>
          selectedCinemaName ? (
            <Typography fontWeight="bold">{selectedCinemaName}</Typography>
          ) : (
            <Typography color="#aaa">Chọn rạp</Typography>
          )
        }
        size="small"
        sx={selectStyles}
      >
        {dataCinemaByLocation ? (
          <>
            {dataCinemaByLocation.map((item, index) => (
              <React.Fragment key={index}>
                {item.cinemas.map((cinema, idx) => (
                  <React.Fragment key={idx}>
                    {/* Tiêu đề hệ thống rạp */}
                    <MenuItem
                      sx={{
                        pointerEvents: "none",
                        paddingY: 1,
                        backgroundColor: "#1e3a8a",
                        borderTop: "1px solid #00eaff",
                        borderBottom: "1px solid #00eaff",
                        borderRadius: "6px",
                        marginTop: idx !== 0 ? 2 : 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.85rem",
                          color: "#ec4899",
                          textTransform: "uppercase",
                        }}
                      >
                        {cinema.cinemaCode}
                      </Typography>
                    </MenuItem>

                    {cinema.items.map((cinemaItem) => (
                      <MenuItem
                        key={cinemaItem._id}
                        value={cinemaItem._id}
                        onClick={() => handleSelectCinema(cinemaItem._id, cinemaItem.name)}
                        selected={cinemaIDSelected === cinemaItem._id}
                        sx={{
                          fontSize: "0.875rem",
                          color: "white",
                          backgroundColor:
                            cinemaIDSelected === cinemaItem._id ? "#242424" : "#1a1a1a",
                          "&:hover": {
                            backgroundColor: "#2c2c2c",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#333",
                            color: "#00eaff",
                          },
                        }}
                      >
                        {cinemaItem.name}
                      </MenuItem>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <LoaderSpinner />
          </div>
        )}

        <MenuItem disabled sx={{ fontSize: "0.8rem", color: "#666", backgroundColor: "#121212" }}>
          Hết!…
        </MenuItem>
      </Select>
    </FormControl>
  );
}
