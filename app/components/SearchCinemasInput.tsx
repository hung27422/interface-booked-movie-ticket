import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCinemas from "../hooks/useCinemas";
import { useAppContext } from "../contexts/AppContextProvider/AppContextProvider";

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
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    backgroundColor: "#121212",
    padding: "1px 10px",
    borderRadius: "8px",
    border: "none",
    position: "absolute",
    fontSize: "0.5rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    transform: "translate(14px, 12px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
    border: "2px solid #00eaff",
    boxShadow: "0 0 2px #00eaff, 0 0 2px #7d2aff",
    transform: "translate(14px, -12px) scale(0.85)",
  },
};

export default function SearchCinemasInput() {
  const { selectedAddress, cinemaIDSelected, setCinemaIDSelected } = useAppContext();

  const [selectedLocation, setSelectedLocation] = React.useState<string[]>(["lt"]);

  const { dataCinemaByLocation } = useCinemas({ location: selectedAddress ?? "" });

  const handleChange = (event: SelectChangeEvent<typeof selectedLocation>) => {
    const {
      target: { value },
    } = event;

    // Chỉ giữ lại giá trị mới, bỏ đi giá trị cũ
    setSelectedLocation(typeof value === "string" ? value.split(",").slice(-1) : value.slice(-1));
  };
  const handleSelectedCinema = (cinemaId: string) => {
    setCinemaIDSelected(cinemaId);
  };
  if (!dataCinemaByLocation) return <div>Loading...</div>;
  return (
    <div>
      <FormControl sx={{ m: 1, width: 320, ...selectStyles }}>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={selectedLocation}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          sx={selectStyles}
          size="small"
          renderValue={() => "Chọn rạp"} // 👉 Hiển thị mặc định
        >
          <div>
            {dataCinemaByLocation?.map((item, index) => (
              <div key={index}>
                {item.cinemas.map((cinema, idx) => (
                  <div key={idx} className="px-2 py-1">
                    {/* Header tên hệ thống rạp */}
                    <div className="text-[#444] font-semibold text-sm mb-1">
                      {cinema.cinemaCode}
                    </div>
                    <ul className="border border-gray-300 rounded">
                      {cinema?.items?.map((cinemaItem) => (
                        <li
                          key={cinemaItem._id}
                          onClick={() => handleSelectedCinema(cinemaItem._id)}
                          className={`text-[14px] py-2 px-3 cursor-pointer text-gray-800 ${
                            cinemaIDSelected === cinemaItem._id
                              ? "bg-blue-950 text-pink-400 font-semibold"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {cinemaItem.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {/* Trạng thái đang tải giả định */}
            <div className="px-3 py-2 text-sm text-gray-500">đang tải…</div>
          </div>
        </Select>
      </FormControl>
    </div>
  );
}
