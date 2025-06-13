"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import useMovie from "../hooks/useMovie";
import { useRouter } from "next/navigation";

const textFieldStyles = {
  position: "relative",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "bold",
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

  // **Label mặc định (không có border)**
  "& .MuiInputLabel-root": {
    color: "#fff",
    backgroundColor: "#121212",
    padding: "1px 10px",
    borderRadius: "8px",
    border: "none", // ❌ Không có viền mặc định
    position: "absolute",
    fontSize: "0.85rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    transform: "translate(14px, 12px) scale(1)",
  },

  // **Khi label focus hoặc có giá trị (hiện viền)**
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
    border: "2px solid #00eaff",
    boxShadow: "0 0 6px #00eaff, 0 0 6px #7d2aff",
    transform: "translate(14px, -12px) scale(0.85)",
  },
};

interface SearchInputProps {
  width: number;
}
export default function SearchInput({ width }: SearchInputProps) {
  const router = useRouter();
  const { dataMovies } = useMovie();

  return (
    <Stack spacing={2} sx={{ width: width }}>
      <Autocomplete
        className="text-white"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={(dataMovies ? dataMovies.map((option) => option.title) : [])}
        onChange={(_, selectedTitle) => {
          const selectedMovie =
            dataMovies && dataMovies.find((movie) => movie.title === selectedTitle);
          if (selectedMovie) {
            // Ví dụ: chuyển đến /movie/123
            router.push(`/pages/buy-ticket/${selectedMovie._id}`);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiếm"
            size="small"
            sx={textFieldStyles}
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
              },
            }}
          />
        )}
        slotProps={style}
      />
    </Stack>
  );
}

const style = {
  popper: {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8], // khoảng cách giữa TextField và dropdown
        },
      },
    ],
  },
  paper: {
    sx: {
      backgroundColor: "#121212",
      color: "#fff",
      border: "2px solid #00eaff",
      boxShadow: "0 0 6px #00eaff, 0 0 6px #7d2aff",
      borderRadius: "10px",
      padding: "4px 0",
    },
  },
  option: {
    sx: {
      transition: "all 0.2s ease-in-out",
      padding: "8px 12px",
      borderRadius: "6px",
      borderBottom: "1px solid #ccc",
    },
  },
};
